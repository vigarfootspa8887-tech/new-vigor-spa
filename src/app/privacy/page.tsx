import type { Metadata } from "next";
import { LegalPage } from "../legal-page";

export const metadata: Metadata = {
  title: "Privacy Policy | New Vigor Foot Spa",
  description: "Privacy policy for the New Vigor Foot Spa website.",
};

export default function PrivacyPolicyPage() {
  return (
    <LegalPage title="Privacy Policy" updated="August 23, 2026">
      <section>
        <h2>Overview</h2>
        <p>
          New Vigor Foot Spa respects your privacy. This policy explains what
          information may be processed when you visit our website and how to
          contact us with privacy questions.
        </p>
      </section>

      <section>
        <h2>Information we process</h2>
        <p>
          This website does not offer user accounts and does not directly
          collect payment information. Basic technical and usage information,
          such as device type, browser type, referring page, and general visit
          activity, may be processed to operate, secure, and understand the
          website.
        </p>
      </section>

      <section>
        <h2>Google Maps and Google reviews</h2>
        <p>
          We use Google Maps features to display our location and publicly
          available business ratings and reviews. The embedded map, reviewer
          profile images, and links to Google Maps may cause your browser to
          connect with Google. Google may process device, network, usage, or
          cookie information under the
          {" "}
          <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">
            Google Privacy Policy
          </a>
          . Google Maps content is also subject to the
          {" "}
          <a href="https://maps.google.com/help/terms_maps/" target="_blank" rel="noopener noreferrer">
            Google Maps Terms
          </a>
          .
        </p>
        <p>
          Reviews shown on this website remain attributed to their authors and
          include links to the source review on Google Maps.
        </p>
      </section>

      <section>
        <h2>Analytics and service providers</h2>
        <p>
          We may use hosting and privacy-conscious analytics providers to
          deliver the website, monitor reliability, and understand aggregate
          traffic. These providers process information only as needed to
          provide their services and protect their systems.
        </p>
      </section>

      <section>
        <h2>External services</h2>
        <p>
          Links for online booking, social media, directions, and reviews lead
          to third-party services. Their privacy practices apply once you visit
          those services.
        </p>
      </section>

      <section>
        <h2>Your choices</h2>
        <p>
          You may limit cookies or third-party content through your browser
          settings. Blocking third-party content may prevent maps, profile
          images, or other embedded features from displaying correctly.
        </p>
      </section>

      <section>
        <h2>Contact us</h2>
        <p>
          For privacy questions, email
          {" "}
          <a href="mailto:vigarfootspa8887@gmail.com">
            vigarfootspa8887@gmail.com
          </a>
          .
        </p>
      </section>
    </LegalPage>
  );
}
