import { createServerClient } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";

function copyCookiesToResponse(
  source: NextResponse,
  target: NextResponse
): void {
  source.cookies.getAll().forEach((cookie) => {
    target.cookies.set(cookie.name, cookie.value, {
      path: cookie.path,
      domain: cookie.domain,
      maxAge: cookie.maxAge,
      httpOnly: cookie.httpOnly,
      sameSite: cookie.sameSite,
      secure: cookie.secure,
    });
  });
}

export async function proxy(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const pathname = request.nextUrl.pathname;

  const isPanelRoute = pathname === "/panel" || pathname.startsWith("/panel/");

  if (!user && isPanelRoute) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    const redirectResponse = NextResponse.redirect(url);
    copyCookiesToResponse(supabaseResponse, redirectResponse);
    return redirectResponse;
  }

  if (user && pathname === "/login") {
    const url = request.nextUrl.clone();
    url.pathname = "/panel";
    const redirectResponse = NextResponse.redirect(url);
    copyCookiesToResponse(supabaseResponse, redirectResponse);
    return redirectResponse;
  }

  return supabaseResponse;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
