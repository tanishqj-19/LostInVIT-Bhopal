import React from "react";
import styled from "styled-components";

function PrivacyPolicy() {
  return (
    <div className="px-6 lg:w-5/6 xl:w-4/6 py-10 mx-auto">
      <div className="space-y-12 text-md md:text-lg text-gray-500 pb-4 md:pb-8">
        <p>
        Welcome to LostInVIT, the official Lost and Found platform for VIT Bhopal. 
        </p>
        <div className="space-y-2">
          <h2 className="text-xl md:text-2xl font-medium text-gray-700">
            Information We Collect
          </h2>
          <p>
          When you register and use LostInVIT, we collect personal information such as your name, email address, and VIT Bhopal registration number. Additionally, we collect details of items you report as lost or found, including descriptions, locations, and any photos you upload. We also gather information 
          about how you use our site, including pages visited, time spent on the site, and other interaction details.
          </p>
        </div>

        <div className="space-y-2">
          <h2 className="text-xl md:text-2xl font-medium text-gray-700">
          How We Use Your Information

          </h2>
          <p>
          We use your information to facilitate the reporting and retrieval of lost and found items. 
          To contact you regarding your lost or found item reports and to send you updates and notifications related to our service. We analyze usage data to improve our platform's functionality and user experience. We also use your information to protect against 
          unauthorized access and ensure the security of our platform.
          </p>
        </div>

        <div className="space-y-2">
          <h2 className="text-xl md:text-2xl font-medium text-gr-700">
          Data Sharing and Disclosure
          </h2>
          <p>
          Information about lost or found items you report will be visible to other users of the platform to facilitate the return of items. We may share your information with third-party service providers who assist us in operating the platform. Additionally, we may disclose
          your information if required by law or in response to valid requests by public authorities.
          </p>
        </div>

        <div className="space-y-2">
          <h2 className="text-xl md:text-2xl font-medium text-gray-700">
          Data Security
          </h2>
          <p>
          We implement various security measures to protect your personal information from unauthorized access, use, or disclosure. However, no internet-based platform can be 100% secure, so we cannot guarantee absolute security.
          </p>
        </div>
      </div>
    </div>
  )};
export default PrivacyPolicy;