import { currentUser } from "@clerk/nextjs";
import { getToken } from "@/utils/getToken"

import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import GetRecommendations from "@/components/GetRecommendations";
import LandingPage from "@/components/LandingPage";
import CookieBanner from "@/components/global/CookieBanner";


export default async function Home() {
  const user = await currentUser()
  if (!user) {
    return (
      <MaxWidthWrapper>
        <LandingPage />
        <CookieBanner />
      </MaxWidthWrapper>
    )
  }
  const token = await getToken()
  const spotifyUserId = user?.externalAccounts[0].id
  const spotifyExternalId = user?.externalAccounts[0].externalId
  const isAuth = !!user && !!spotifyUserId

  if (!user || !spotifyUserId || !token) {
    return
  }

  return (
    <MaxWidthWrapper>
      {isAuth &&
        (
          <GetRecommendations
            spotifyUserId={spotifyExternalId}
            token={token}
          />
        )
      }
    </MaxWidthWrapper>
  )
}
