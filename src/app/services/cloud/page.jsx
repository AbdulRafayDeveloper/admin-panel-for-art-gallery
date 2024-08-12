"use client";
import Approach from "@/app/components/approach/Approach";
import Footer from "@/app/components/footer/Footer";
import Service from "@/app/components/serviceheader/Service";
import List from "@/app/components/servicelist/List";
import React from "react";

function page() {
  return (
    <div>
      <Service
        videoSrc={"/assets/videos/cloud.mp4"}
        title={"Cloud Services Solutions"}
        subtitle={"Empower with scalable, secure, and reliable cloud solutions"}
      />
      <Approach />
      <section
        id="features"
        className="container mx-auto px-4 space-y-6 bg-slate-800 py-8 md:py-12 lg:py-20"
      >
        <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
          <h2 className="font-bold text-xl leading-[1.1] sm:text-3xl md:text-4xl text-white">
            Technologies We Use
          </h2>

          <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7 text-white">
            We specialize in leveraging industry-leading cloud platforms such as
            IBM, Azure, Google Cloud, and AWS to deliver robust and scalable AI
            solutions
          </p>
        </div>

        <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
          <div className="relative overflow-hidden rounded-lg bg-gray-700 select-none hover:shadow hover:shadow-teal-200 p-2">
            <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
              <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-indigo-50">
                <img
                  src="/assets/pictures/amazon.svg"
                  alt="MongoDB Icon"
                  className="h-12 w-12 text-indigo-400 grayscale"
                  style={{ filter: "grayscale(80%)" }}
                />
              </div>
              <div className="space-y-2">
                <h3 className="font-bold text-white">AWS</h3>
                <p className="text-sm text-white">
                  AWS Cloud services integration
                </p>
              </div>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-lg bg-gray-700 select-none hover:shadow hover:shadow-teal-200 p-2">
            <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
              <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-indigo-50">
                <img
                  src="/assets/pictures/azure.svg"
                  alt="MongoDB Icon"
                  className="h-12 w-12 text-indigo-400 grayscale"
                  style={{ filter: "grayscale(100%)" }}
                />
              </div>
              <div className="space-y-2">
                <h3 className="font-bold text-white">Azure</h3>
                <p className="text-sm text-white">
                  Azure Cloud services integration
                </p>
              </div>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-lg bg-gray-700 select-none hover:shadow hover:shadow-teal-200 p-2">
            <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
              <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-indigo-50">
                <img
                  src="/assets/pictures/digitalocean.svg"
                  alt="MongoDB Icon"
                  className="h-12 w-12 text-indigo-400 grayscale"
                  style={{ filter: "grayscale(80%)" }}
                />
              </div>
              <div className="space-y-2">
                <h3 className="font-bold text-white">Digital Ocean</h3>
                <p className="text-sm text-white">
                  {" "}
                  Cloud services integration
                </p>
              </div>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-lg bg-gray-700 select-none hover:shadow hover:shadow-teal-200 p-2">
            <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
              <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-indigo-50">
                <img
                  src="/assets/pictures/heroku.svg"
                  alt="MongoDB Icon"
                  className="h-12 w-12 text-indigo-400 grayscale"
                  style={{ filter: "grayscale(80%)" }}
                />
              </div>
              <div className="space-y-2">
                <h3 className="font-bold text-white">Heroku</h3>
                <p className="text-sm text-white">Cloud services integration</p>
              </div>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-lg bg-gray-700 select-none hover:shadow hover:shadow-teal-200 p-2">
            <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
              <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-indigo-50">
                <img
                  src="/assets/pictures/vercel.svg"
                  alt="MongoDB Icon"
                  className="h-12 w-12 text-indigo-400 grayscale"
                  style={{ filter: "grayscale(80%)" }}
                />
              </div>
              <div className="space-y-2">
                <h3 className="font-bold text-white">Vercel</h3>
                <p className="text-sm text-white">Cloud services integration</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <List
        servicesList={[
          "Cloud Consulting Services",
          "Infrastructure as a Service (IaaS)",
          "Platform as a Service (PaaS)",
          "Software as a Service (SaaS",
          "Database as a Service (DBaaS)",
          "Backup and Disaster Recovery Services",
          "Serverless Computing",
        ]}
      />

      <Footer />
    </div>
  );
}

export default page;
