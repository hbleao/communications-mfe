import { Dialog } from "./components/Dialog"
import { BannerCarousel } from "./components/BannerCarousel"

export default function Root(props: { name?: string }) {
  return (
    <section>
      <div style={{ fontSize: 14, marginBottom: 12, color: "#0f172a" }}>
        {props.name ? `${props.name} (standalone)` : "@porto/communication-mfe"}
      </div>

      <div style={{ width: "100%" }}>
        <BannerCarousel />
      </div>
      
      <Dialog />
    </section>
  )
}
