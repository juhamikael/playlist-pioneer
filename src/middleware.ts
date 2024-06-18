import {
  clerkMiddleware, createRouteMatcher
} from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher([
  // '/api(.*)',
]);


export default clerkMiddleware((auth, req) => {
  if (isProtectedRoute(req)) auth().protect();
});

// export default clerkMiddleware({

//     // "/",
//     // "/contact",
//     // "/about",
//     // "/faq",
//     // "/api/artists-from-track",
//     // "/api/get-recommendations",
//     // "/api/create-playlist",
//     // "/api/add-tracks-to-playlists"
// });

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};