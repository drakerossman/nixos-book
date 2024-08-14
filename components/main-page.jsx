'use client'

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import Link from "next/link"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

import { initializePaddle } from '@paddle/paddle-js';

import { GitHubIcon, DiscordIcon, MastodonIcon, TwitterIcon } from "./ui/socials";

export function MainPage() {

  const [showModal, setShowModal] = React.useState(false)

  const [showSuccessModal, setShowSuccessModal] = React.useState(false)

  const handleSuccessModalClose = () => {
    setShowSuccessModal(false)
  }

  const [showCompletedSuccessModal, setShowCompletedSuccessModal] = React.useState(false)

  const handleCompletedSuccessModalClose = () => {
    setShowCompletedSuccessModal(false)
  }

  const [tosAgreed, setTosAgreed] = React.useState(false)

  const handleBuyClick = () => {
    setShowModal(true)
  }

  const handleModalClose = () => {
    setShowModal(false)
  }

  const handleTosAgree = () => {
    setTosAgreed(true)
  }

  const paddleEventCallback = (event) => {
    console.log(event)
    if (event.name === 'checkout.closed') {
      if (event.data.status !== 'completed') {
        setShowSuccessModal(true)
      }

      if (event.data.status === 'completed') {
        setShowCompletedSuccessModal(true)

      }
    }
  }

  const [paddle, setPaddle] = React.useState();

  // production
  React.useEffect(() => {
    initializePaddle(
      {
        environment : 'sandbox',
        token       : 'test_e658eedd76bbc38923141c79909',
        eventCallback: paddleEventCallback

      }
    )
    .then(
      (paddleInstance) => {
        if (paddleInstance) {
          setPaddle(paddleInstance);
        }
      },
    );
  }, []);

  // Callback to open a checkout
  const openCheckout = () => {
    paddle?.Checkout.open({
      theme: 'dark',
      items: [{
        priceId: 'pri_01j55mfgn14pwage4xp7trq636', quantity: 1 }],
      discountId: "dsc_01j55mj8e7wmrbdnf1g2d2a5xb",
      successUrl: "/",
    });
  };

  const handleOkClick = () => {
    if (tosAgreed) {
      setShowModal(false)
      openCheckout()
    }
  }

//   // sandbox
//   React.useEffect(() => {
//     initializePaddle(
//       {
//         environment: 'sandbox',
//         token: 'test_e658eedd76bbc38923141c79909',
//         eventCallback: paddleEventCallback
//
//       }
//     )
//       .then(
//         (paddleInstance) => {
//           if (paddleInstance) {
//             setPaddle(paddleInstance);
//           }
//         },
//       );
//   }, []);
//
//   const openCheckout = () => {
//     paddle?.Checkout.open({
//       theme: 'dark',
//       items: [{ priceId: 'pri_01j4yj619sytz578kfpn7d33jf', quantity: 1 }],
//       successUrl: "/",
//       discountId: "dsc_01j55myxqt8hq0xfz6xd3zaxxz",
//     });
//   };
//
//   const handleOkClick = () => {
//     if (tosAgreed) {
//       setShowModal(false)
//       openCheckout()
//     }
//   }

  return (
    (
    <div
      className="min-h-screen bg-gradient-to-br from-[#1e40af] to-[#b91c1c] relative overflow-hidden">
      <div
        className="relative z-10 container mx-auto mb-10 px-4 md:px-6 py-12 md:py-24 grid md:grid-cols-2 gap-2">
        <div className="flex flex-col items-center">
          <img
            src="/book-cover-for-webpage.png"
            alt="Book Cover"
            width={300}
            height={450}
            className="shadow-lg"
            style={{ aspectRatio: "300/450", objectFit: "cover" }} />
        </div>
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl md:mt-0 mt-5 md:text-4xl font-bold text-white">The Book of NixOS</h1>
            <p className="text-lg md:text-xl text-gray-200">A thrilling journey through a declarative and reproducible future</p>
          </div>
          <div className="space-y-4">
            <p className="text-gray-300">
                In a world consumed by technology and corporate power, one Operating System dares to challenge the status quo.
                Follow the gripping tale of NixOS, who harnesses the powers of declarative configuration and reproducible builds to expose the truth.

            </p>
            <p className="text-gray-300">
               This book will teach you all the ins outs of the NixOS Linux Distribution and the Nix Expressions Language, as well as give you solid foundations of the general Linux understanding.
            </p>
            <Button
              className="bg-green-600 text-primary-foreground px-6 py-3 rounded-lg hover:bg-cyan-300 hover:text-black transition-colors mx-2"
              onClick={() => {
                handleBuyClick();
              }}
            >
              Pre-order E-Book for $69.90
            </Button>
          </div>
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarImage src="/author-avatar.png" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-lg font-semibold text-white">Drake Rossman</h3>
              <p className="text-gray-300">Recognized expert in the NixOS community</p>
            </div>
          </div>
        </div>
      </div>
      {showModal && (
        <Dialog open={showModal} onOpenChange={handleModalClose}>
          <DialogContent className="bg-gray-800 text-white p-6 rounded-lg shadow-lg max-w-md">
            <DialogHeader>
            </DialogHeader>
            <div>
              <p className="text-gray-300">
                  Please enter a valid email during checkout. Your book will be sent to this email.
              </p>
              <br></br>
              <p className="text-gray-300">
                By continuing, you accept our <span>
                  <Link className="underline" href="/terms-and-conditions">
                    Terms and Conditions
                  </Link>
                </span> and <span>
                  <Link className="underline" href="/privacy-policy">
                  Privacy Policy
                  </Link>
                </span>
              </p>
                <div className="mt-8 flex justify-center items-center">
                  <Checkbox className="mr-3" id="tos-agree" onCheckedChange={handleTosAgree} />
                  <Label htmlFor="tos-agree">Acknowledged</Label>
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleOkClick}>OK</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
      {showSuccessModal && (
        <Dialog open={showSuccessModal} onOpenChange={handleSuccessModalClose}>
          <DialogContent className="bg-gray-800 text-white p-6 rounded-lg shadow-lg max-w-md">
            <DialogHeader>
            </DialogHeader>
            <div>
              <p className="text-gray-300">
                Not decided yet? Check our NixOS community to learn, what other people think about the book:
              </p>
            </div>
            <Link
              href="https://discord.gg/UqZzQaW6Dp"
              className="mt-5 group text-[#7289da] transition-colors grid grid-cols-5 gap-x-3"
              prefetch={false}>
              <div className="place-self-end col-span-1">
                <DiscordIcon className="w-12 h-12" />
              </div>
              <span className="col-span-4 text-lg font-semibold text-gray-400 group-hover:text-gray-100 place-self-left pt-2">Join NixOS Community Discord</span>
            </Link>
            <DialogFooter>
              <Button onClick={handleSuccessModalClose}>OK</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
      {showCompletedSuccessModal && (
        <Dialog open={showCompletedSuccessModal} onOpenChange={handleCompletedSuccessModalClose}>
          <DialogContent className="bg-gray-800 text-white p-6 rounded-lg shadow-lg max-w-md">
            <DialogHeader>
              <DialogTitle>Success!</DialogTitle>
            </DialogHeader>
            <div>
              <p className="text-gray-300">
                Thank you for purchasing the book! It will be sent to your email shortly.
                  <br />
                  <br />
                In the meantime, check our community resources:
              </p>
            </div>
            <div className="grid gd-cols-1 mt-3 gap-y-3">
              <Link
                  href="https://discord.gg/UqZzQaW6Dp"
                  className="group text-[#7289da] transition-colors grid grid-cols-2"
                prefetch={false}>
                  <div style={{marginRight: '80px'}} className="place-self-end">
                    <DiscordIcon className="w-12 h-12" />
                  </div>
                  <span style={{ marginLeft: '-50px' }} className="text-lg font-semibold text-gray-400 group-hover:text-gray-100 place-self-left pt-2">Follow on Discord</span>
              </Link>
              <Link
                  href="https://mastodon.social/@drakerossman"
                  className="group text-[#6364ff] transition-colors grid grid-cols-2"
                prefetch={false}>
                  <div style={{marginRight: '70px'}} className="place-self-end">
                    <MastodonIcon className="w-14 h-11" />
                  </div>
                  <span style={{ marginLeft: '-50px' }} className="text-lg font-semibold text-gray-400 group-hover:text-gray-100 place-self-left pt-2">Follow on Mastodon</span>
              </Link>
            </div>
            <DialogFooter>
              <Button onClick={handleCompletedSuccessModalClose}>OK</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
      <script data-goatcounter="https://nixosbook.goatcounter.com/count"
          async src="//gc.zgo.at/count.js"></script>
        <footer className="bg-gray-900 py-5 footer absolute bottom-0 w-full">
        <div className="container mx-auto px-4 md:px-6 flex justify-center items-center space-x-6">
          <Link href="https://github.com/drakerossman/nixos-book" className="text-gray-400 hover:text-[#ededed] transition-colors" prefetch={false}>
            <GitHubIcon className="w-10 h-10" />
          </Link>
            <Link href="https://discord.gg/UqZzQaW6Dp" className="text-gray-400 hover:text-[#4f65f4] transition-colors" prefetch={false}>
            <DiscordIcon className="w-10 h-10" />
          </Link>
          <Link href="https://mastodon.social/@drakerossman" className="text-gray-400 hover:text-[#296cbe] transition-colors" prefetch={false}>
            <MastodonIcon className="w-10 h-10" />
          </Link>
          <Link href="https://twitter.com/drakerossman" className="text-gray-400 hover:text-[#4fa6f2] transition-colors" prefetch={false}>
            <TwitterIcon className="w-10 h-10" />
          </Link>
            <span>
              <Link className="text-gray-400 underline" href="/terms-and-conditions">
                Terms and Conditions
              </Link>
            </span>
            <span>
              <Link className="text-gray-400 underline" href="/privacy-policy">
                Privacy Policy
              </Link>
            </span>
        </div>
      </footer>
    </div>)
  );
}
