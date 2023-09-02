import { Dialog, Transition } from "@headlessui/react";
import { Visibility, VisibilityOffRounded } from "@mui/icons-material";
import axios from "axios";
import { Field, Form, Formik } from "formik";
import { forwardRef, useImperativeHandle, useRef } from "react";
import { Fragment, useState } from "react";
import sha256 from "sha256";

function MyModal({ title }, ref) {
  const [isOpen, setIsOpen] = useState(true);
  const [showPw, setShowPw] = useState(false);

  useImperativeHandle(ref, () => ({
    openModal() {
      setIsOpen(true);
    },
  }));

  const closeModal = () => {
    setIsOpen(false);
  };

  const submit = ({ username, password }) => {
    axios.put("/api/auth/createUser", {
      data: {
        username,
        password: sha256(password),
      },
    });
  };

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    {title}
                  </Dialog.Title>
                  <div className="mt-6">
                    <Formik
                      initialValues={{ username: "", password: "" }}
                      onSubmit={submit}
                    >
                      <Form className="space-y-4">
                        <div className="space-y-2">
                          <label>Username</label>
                          <Field
                            name="username"
                            className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-blue-500 focus:outline-none sm:text-sm"
                          />
                        </div>
                        <div className="space-y-2">
                          <label>Password</label>

                          <div className="relative w-full">
                            <div className="absolute inset-y-0 right-0 flex items-center px-2">
                              <input
                                className="hidden"
                                id="toggle"
                                name="toggle"
                                type="checkbox"
                                onClick={() => setShowPw(!showPw)}
                              />
                              <label
                                className="px-2 cursor-pointer"
                                htmlFor="toggle"
                              >
                                {showPw ? (
                                  <VisibilityOffRounded />
                                ) : (
                                  <Visibility />
                                )}
                              </label>
                            </div>
                            <Field
                              name="password"
                              type={showPw ? "text" : "password"}
                              className="w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-blue-500 focus:outline-none sm:text-sm  "
                            />
                          </div>
                        </div>

                        <div className="mt-8 flex justify-end gap-x-2">
                          <button
                            type="submit"
                            className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none"
                            onClick={closeModal}
                          >
                            Create
                          </button>
                          <button
                            type="button"
                            className="inline-flex justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 focus:outline-none"
                            onClick={closeModal}
                          >
                            Cancel
                          </button>
                        </div>
                      </Form>
                    </Formik>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}

export default forwardRef(MyModal);
