import { useRouter } from "next/router"
import { useEffect } from "react";

const error = () => {
  const router = useRouter();
  useEffect(()=>{
    setTimeout(()=>{
        router.push('/')
    },5000)
  },[])
  return (
    <>
        <h1>Page not found</h1>
        <a>Back to home page</a>
    </>
  )
}

export default error