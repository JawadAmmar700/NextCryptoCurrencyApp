import { useRouter } from "next/router"

const useTrack_page = (): string => {
  const { pathname } = useRouter()
  return pathname.split("/")[1]
}

export default useTrack_page
