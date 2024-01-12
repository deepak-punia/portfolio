"use client";
import { Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import useProjectStore from "../stores/useProject";

const tempProjectData = {
    title: "My Awesome Project",
    summary: "This is a fantastic project where we built an interactive web application.",
    technologies: ["React", "Tailwind CSS", "Node.js", "Express"],
    features: ["Real-time data processing", "Responsive design", "User authentication"],
    image: "https://via.placeholder.com/400", // Placeholder image URL
    link: "https://example.com", // Placeholder for live site URL
    sourceCode: "https://github.com/example/project" // Placeholder for source code URL
  };
  
const ProjectDetails = () => {
  const project = useProjectStore((state) => state.project);
  const visible = useProjectStore((state) => state.visible);
  const hideDialog = useProjectStore((state) => state.hideDialog);
  
  const onClose = () => {
    hideDialog();
  };

  

  const cancelButtonRef = useRef(null);

  return (
    <Transition.Root show={false} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-[99999]"
        initialFocus={cancelButtonRef}
        onClose={onClose}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all w-96 sm:my-8 md:w-full sm:max-w-lg">
              <div className="bg-gray-50 justify-between items-center px-4 py-3 sm:flex sm:flex-row sm:px-6">
                    <h2
                        
                        className="text-lg font-semibold  text-gray-900"
                      >
                        {project?.title}
                      </h2>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    onClick={onClose}
                    ref={cancelButtonRef}
                  >
                    X
                  </button>
                </div>

                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mx-auto text-2xl flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                      icon
                    </div>
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                      <Dialog.Title
                        as="h3"
                        className="text-base font-semibold leading-6 text-gray-900"
                      >
                        {project?.title}
                      </Dialog.Title>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">Body</p>
                      </div>
                    </div>
                  </div>
                </div>
                
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default ProjectDetails;
