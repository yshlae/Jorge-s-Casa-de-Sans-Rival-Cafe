import { ImageWithFallback } from "./figma/ImageWithFallback";
import storyImage from "figma:asset/db402c1692d313bcb492a0ffd46f4cf7845de44e.png";

export function About() {
  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="mb-6 text-primary">Our Story</h2>
            <p className="mb-4">
              Founded in 2024, Jorge's Cafe has been serving the
              community with passion and dedication. We believe
              in the power of great coffee to bring people
              together and create memorable moments.
            </p>
            <p className="mb-4">
              Our beans are carefully sourced from sustainable
              farms around the world, roasted in small batches,
              and brewed to perfection by our expert baristas.
            </p>
            <p>
              Whether you're catching up with friends, working
              on your next big project, or simply enjoying a
              quiet moment, we're here to make your day a little
              brighter.
            </p>
          </div>
          <div className="relative h-[400px] rounded-lg overflow-hidden shadow-lg">
            <iframe
              src="https://drive.google.com/file/d/1A67g7HMdkyGTAP8UR0OhPbdyJfacj7an/preview"
              className="w-full h-full"
              allow="autoplay"
              title="Jorge's Cafe Video"
            />
          </div>
        </div>
      </div>
    </section>
  );
}