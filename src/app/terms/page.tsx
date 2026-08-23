import type { Metadata } from "next";
import { LegalPage } from "../legal-page";

export const metadata: Metadata = {
  title: "Terms of Use | New Vigor Foot Spa",
  description: "Terms of use for the New Vigor Foot Spa website.",
};

export default function TermsPage() {
  return (
    <LegalPage title="Terms of Use" updated="August 23, 2026">
      <section>
        <h2>Acceptance of these terms</h2>
        <p>
          By using this website, you agree to these Terms of Use. If you do not
          agree, please do not use the website.
        </p>
      </section>

      <section>
        <h2>Website information</h2>
        <p>
          This website provides general information about New Vigor Foot Spa,
          including services, pricing, hours, contact details, and location.
          Information may change without notice. Please contact us to confirm
          current availability, pricing, and appointment details.
        </p>
      </section>

      <section>
        <h2>Appointments and third-party services</h2>
        <p>
          Online booking, maps, reviews, and social media features may be
          operated by third parties. Your use of those services is governed by
          their own terms and policies. Google Maps features and content are
          subject to the
          {" "}
          <a href="https://maps.google.com/help/terms_maps/" target="_blank" rel="noopener noreferrer">
            Google Maps Terms
          </a>
          {" "}and the
          {" "}
          <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">
            Google Privacy Policy
          </a>
          .
        </p>
      </section>

      <section>
        <h2>Wellness information</h2>
        <p>
          Website content is for general informational purposes and is not
          medical advice, diagnosis, or treatment. Massage and wellness
          services may not be appropriate for every person. Consult a qualified
          healthcare professional about medical concerns or conditions before
          receiving services.
        </p>
      </section>

      <section>
        <h2>Intellectual property</h2>
        <p>
          Unless otherwise stated, the website design, business materials, and
          original content belong to New Vigor Foot Spa. Third-party names,
          reviews, images, trademarks, and platform content remain the property
          of their respective owners.
        </p>
      </section>

      <section>
        <h2>Disclaimer and limitation</h2>
        <p>
          The website is provided on an “as available” basis. To the fullest
          extent permitted by law, New Vigor Foot Spa does not guarantee that
          the website will always be uninterrupted, error-free, or completely
          current, and is not responsible for third-party websites or services.
        </p>
      </section>

      <section>
        <h2>Changes</h2>
        <p>
          We may update these terms from time to time. The date at the top of
          this page identifies the latest revision.
        </p>
      </section>

      <section>
        <h2>Contact us</h2>
        <p>
          Questions about these terms may be sent to
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
