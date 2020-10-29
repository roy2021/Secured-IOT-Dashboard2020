import { NextSeo } from 'next-seo';
import Home from '../components/home';
export default function DashBoard({name}) {
  return (
    <div>
      <NextSeo title="DashBoard | IOT" description="DashBoard of IOT" openGraph={{
        title: "DashBoard | IOT",
        description: "DashBoard of IOT",
        images: [
          { url:'/assets/logo.svg' }
        ]}} />
        <Home/>
    </div>
  )
}
