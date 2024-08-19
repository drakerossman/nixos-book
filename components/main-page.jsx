'use client'

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import Link from "next/link"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { GitHubIcon, DiscordIcon, MastodonIcon, TwitterIcon } from "./ui/socials";

export function MainPage() {

  const [currency, setCurrency] = React.useState('')

  React.useEffect(() => {
    let europeanTimezones = [
      'Europe/Amsterdam',
      'Europe/Andorra',
      'Europe/Brussels',
      'Europe/Berlin',
      'Europe/Copenhagen',
      'Europe/Lisbon',
      'Europe/Madrid',
      'Europe/Malta',
      'Europe/Monaco',
      'Europe/Paris',
      'Europe/Prague',
      'Europe/Rome',
      'Europe/San_Marino',
      'Europe/Vatican',
      'Europe/Vaduz',
      'Europe/Oslo',
      'Europe/Zurich',
      'Europe/Vienna',
      'Europe/Sofia',
      'Europe/Zagreb',
      'Asia/Famagusta',
      'Asia/Nicosia',
      'Europe/Tallinn',
      'Europe/Helsinki',
      'Europe/Busingen',
      'Europe/Athens',
      'Europe/Budapest',
      'Europe/Dublin',
      'Europe/Riga',
      'Europe/Vilnius',
      'Europe/Luxembourg',
      'Europe/Warsaw',
      'Atlantic/Azores',
      'Atlantic/Madeira',
      'Europe/Bucharest',
      'Europe/Bratislava',
      'Europe/Ljubljana',
      'Africa/Ceuta',
      'Atlantic/Canary',
      'Europe/Stockholm'
    ]

    let britishTimezones = [
      'Europe/London',
      'GB',
      'GB-Eire',
      'GMT',
      'Atlantic/Ascension',
      'Atlantic/St_Helena',
    ]

    const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone

    let currency = '$'

    if (europeanTimezones.includes(userTimeZone)) {
      currency = '€'
    }

    if (britishTimezones.includes(userTimeZone)) {
      currency = '£'
    }

    if (
      !europeanTimezones.includes(userTimeZone)
      && !britishTimezones.includes(userTimeZone)
    ) {
      currency = '$'
    }

    setCurrency(currency)
  }, [])


  const clearQueryParams = () => {
    const urlWithoutQuery = window.location.protocol + "//" + window.location.host + window.location.pathname;

    window.history.replaceState({ path: urlWithoutQuery }, '', urlWithoutQuery);
  };


  const [showInitialModal, setShowInitialModal] = React.useState(false)

  const [showCanceledModal, setShowCanceledModal] = React.useState(false)

  const handleCanceledModalClose = () => {
    setShowCanceledModal(false)
    clearQueryParams()
  }

  const [showCompletedModal, setShowCompletedModal] = React.useState(false)

  const handleCompletedModalClose = () => {
    setShowCompletedModal(false)
    clearQueryParams()
  }

  const [showTosModal, setShowTosModal] = React.useState(false)

  const handleTosModalOpen = () => {
    setShowTosModal(true);
    window.history.pushState({ modalOpen: true }, '', '/terms-and-conditions');
  };


  const handleTosModalClose = () => {
    setShowTosModal(false)
    clearQueryParams()
    window.history.pushState({ modalOpen: false }, '', '/');
  }

  React.useEffect(() => {
    if (window.location.pathname === '/terms-and-conditions') {
      setShowTosModal(true);
    }

    const handlePopState = (event) => {
      if (event.state && event.state.modalOpen) {
        setShowTosModal(true);
      } else {
        setShowTosModal(false);
      }
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  const [showPrivacyModal, setShowPrivacyModal] = React.useState(false)

  const handlePrivacyModalOpen = () => {
    setShowPrivacyModal(true);
    window.history.pushState({ modalOpen: true }, '', '/privacy-policy');
  };

  const handlePrivacyModalClose = () => {
    setShowPrivacyModal(false)
    clearQueryParams()
    window.history.pushState({ modalOpen: false }, '', '/');
  }

  React.useEffect(() => {
    if (window.location.pathname === '/privacy-policy') {
      setShowPrivacyModal(true);
    }

    const handlePopState = (event) => {
      if (event.state && event.state.modalOpen) {
        setShowPrivacyModal(true);
      } else {
        setShowPrivacyModal(false);
      }
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  const [tosAgreed, setTosAgreed] = React.useState(false)

  const handleBuyClick = () => {
    setShowInitialModal(true)
  }

  const handleInitialModalClose = () => {
    setShowInitialModal(false)
    clearQueryParams()
    setShowCanceledModal(true)
  }

  const handleTosAgree = (checked) => {
    setTosAgreed(checked)
  }

  const formRef = React.useRef(null);

  const handleOkClick = () => {
    if (tosAgreed) {
      if (formRef.current) {
        formRef.current.submit();
      }

    }
  }

  React.useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    if (query.get('success')) {
      console.log('Order placed! You will receive an email confirmation.');
      setShowCompletedModal(true)
    }

    if (query.get('canceled')) {
      console.log('Order canceled -- continue to shop around and checkout when you’re ready.');
      setShowCanceledModal(true)
    }

    if (query.get('terms-and-conditions')) {
      setShowTosModal(true)
    }

    if (query.get('privacy-policy')) {
    }

  }, []);


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
        <div className="space-y-6 md:mb-0 mb-14">
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
              Pre-order E-Book for {currency}69.90
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
      {showInitialModal && (
        <Dialog open={showInitialModal} onOpenChange={handleInitialModalClose}>
          <DialogContent className="bg-gray-800 text-white p-6 rounded-lg shadow-lg max-w-md">
            <DialogHeader>
            </DialogHeader>
            <div>
              <p className="text-gray-300">
                  Please enter a valid email during checkout. Your book will be sent to this email.
              </p>
                <div className="mt-8 flex justify-center items-center">
                  <Checkbox className="mr-3" id="tos-agree" onCheckedChange={handleTosAgree} />
                  <Label htmlFor="tos-agree">Acknowledged</Label>
              </div>
            </div>
            <DialogFooter>
              <form ref={formRef} action="/api/checkout_sessions" method="POST">
                <section>
                  <button type="submit" role="link" style={{ display: 'none' }}>
                    Checkout
                  </button>
                </section>
              </form>
              <Button onClick={handleOkClick}>To Stripe Checkout</Button>

            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {showCanceledModal && (
        <Dialog open={showCanceledModal} onOpenChange={handleCanceledModalClose}>
          <DialogContent className="bg-gray-800 text-white p-6 rounded-lg shadow-lg max-w-md">
            <DialogHeader>
            </DialogHeader>
            <div>
              <p className="text-gray-300">
                Not decided yet? Check our NixOS community to learn what other people think about the Book:
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
              <Button onClick={handleCanceledModalClose}>OK</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {showCompletedModal && (
        <Dialog open={showCompletedModal} onOpenChange={handleCompletedModalClose}>
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
              <Button onClick={handleCompletedModalClose}>OK</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {showTosModal && (
        <Dialog open={showTosModal} onOpenChange={handleTosModalClose}>
          <DialogContent className="bg-gray-800 text-white p-6 rounded-lg shadow-lg max-w-4xl">
            <DialogHeader>
            </DialogHeader>
              <div style={{maxHeight: '70vh', overflowY: 'auto' }}>
                <>
                  <h1 id="terms-and-conditions">Terms and Conditions</h1>
                  <p><strong>Effective date:</strong> 08/14/2024</p>
                  <br></br>
                  <h2 style={{ fontWeight: "bold" }} id="agreement-to-our-legal-terms">Agreement to Our Legal Terms</h2>
                  <p>Welcome to Drake Rossman.</p>
                  <p>Drake Rossman (“us”, “we”, or “our”) operates <a
                    href="https://nixosbook.com">https://nixosbook.com</a> (hereinafter
                    referred to as “Service”) as well as any other related products and
                    services that refer or link to these legal terms (the “Legal Terms”)
                    (collectively, the “Services”).</p>
                  <p>You can contact us by email at drake.rossman@protonmail.com.</p>
                  <p>These Legal Terms constitute a legally binding agreement made between
                    you, whether personally or on behalf of an entity (“you”), and Drake
                    Rossman, concerning your access to and use of the Services. You agree
                    that by accessing the Services, you have read, understood, and agreed to
                    be bound by all of these Legal Terms. <strong>IF YOU DO NOT AGREE WITH
                      ALL OF THESE LEGAL TERMS, THEN YOU ARE EXPRESSLY PROHIBITED FROM USING
                      THE SERVICES AND YOU MUST DISCONTINUE USE IMMEDIATELY.</strong></p>
                  <p>We will provide you with prior notice of any scheduled changes to the
                    Services you are using. The modified Legal Terms will become effective
                    upon posting or notifying you by drake.rossman@protonmail.com as stated
                    in the email message. By continuing to use the Services after the
                    effective date of any changes, you agree to be bound by the modified
                    terms.</p>
                  <p>The Services are intended for users who are at least 13 years of age.
                    All users who are minors in the jurisdiction in which they reside
                    (generally under the age of 18) must have the permission of, and be
                    directly supervised by, their parent or guardian to use the Services. If
                    you are a minor, you must have your parent or guardian read and agree to
                    these Legal Terms prior to you using the Services.</p>
                  <p>We recommend that you print a copy of these Legal Terms for your
                    records.</p>
                  <br></br>
                  <h2 style={{ fontWeight: "bold" }} id="our-services">Our Services</h2>
                  <p>The information provided when using the Services is not intended for
                    distribution to or use by any person or entity in any jurisdiction or
                    country where such distribution or use would be contrary to law or
                    regulation or which would subject us to any registration requirement
                    within such jurisdiction or country. Accordingly, those persons who
                    choose to access the Services from other locations do so on their own
                    initiative and are solely responsible for compliance with local laws, if
                    and to the extent local laws are applicable.</p>
                  <p>The Services are not tailored to comply with industry-specific
                    regulations (Health Insurance Portability and Accountability Act
                    (HIPAA), Federal Information Security Management Act (FISMA), etc.), so
                    if your interactions would be subjected to such laws, you may not use
                    the Services. You may not use the Services in a way that would violate
                    the Gramm-Leach-Bliley Act (GLBA).</p>
                  <br></br>
                  <h2 style={{ fontWeight: "bold" }} id="intellectual-property-rights">Intellectual Property Rights</h2>
                  <h3 id="our-intellectual-property">Our Intellectual Property</h3>
                  <p>We are the owner or the licensee of all intellectual property rights
                    in our Services, including all source code, databases, functionality,
                    software, website designs, audio, video, text, photographs, and graphics
                    in the Services (collectively, the “Content”), as well as the
                    trademarks, service marks, and logos contained therein (the
                    “Marks”).</p>
                  <p>Our Content and Marks are protected by copyright and trademark laws
                    (and various other intellectual property rights and unfair competition
                    laws) and treaties in the United States and around the world.</p>
                  <p>The Content and Marks are provided in or through the Services “AS IS”
                    for your personal, non-commercial use or internal business purpose
                    only.</p>
                  <h3 id="your-use-of-our-services">Your Use of Our Services</h3>
                  <p>Subject to your compliance with these Legal Terms section below, we
                    grant you a non-exclusive, non-transferable, revocable license to:</p>
                  <ul>
                    <li>Access the Services; and</li>
                    <li>Download or print a copy of any portion of the Content to which you
                      have properly gained access.</li>
                  </ul>
                  <p>Solely for your personal, non-commercial use or internal business
                    purpose.</p>
                  <p>Except as set out in this section or elsewhere in our Legal Terms, no
                    part of the Services and no Content or Marks may be copied, reproduced,
                    aggregated, republished, uploaded, posted, publicly displayed, encoded,
                    translated, transmitted, distributed, sold, licensed, or otherwise
                    exploited for any commercial purpose whatsoever, without our express
                    prior written permission.</p>
                  <p>If you wish to make any use of the Services, Content, or Marks other
                    than as set out in this section or elsewhere in our Legal Terms, please
                    address your request to: drake.rossman@protonmail.com. If we ever grant
                    you the permission to post, reproduce, or publicly display any part of
                    our Services or Content, you must identify us as the owners or licensors
                    of the Services, Content, or Marks and ensure that any copyright or
                    proprietary notice appears or is visible on posting, reproducing, or
                    displaying our Content.</p>
                  <p>We reserve all rights not expressly granted to you in and to the
                    Services, Content, and Marks.</p>
                  <p>Any breach of these Intellectual Property Rights will constitute a
                    material breach of our Legal Terms and your right to use our Services
                    will terminate immediately.</p>
                  <br></br>
                  <h2 style={{ fontWeight: "bold" }} id="user-representations">User Representations</h2>
                  <p>By using the Services, you represent and warrant that:</p>
                  <ol type="1">
                    <li>You have the legal capacity and you agree to comply with these Legal
                      Terms;</li>
                    <li>You are not under the age of 13;</li>
                    <li>You are not a minor in the jurisdiction in which you reside, or if a
                      minor, you have received parental permission to use the Services;</li>
                    <li>You will not access the Services through automated or non-human
                      means, whether through a bot, script or otherwise;</li>
                    <li>You will not use the Services for any illegal or unauthorized
                      purpose; and</li>
                    <li>Your use of the Services will not violate any applicable law or
                      regulation.</li>
                  </ol>
                  <p>If you provide any information that is untrue, inaccurate, not
                    current, or incomplete, we have the right to suspend or terminate your
                    account and refuse any and all current or future use of the Services (or
                    any portion thereof).</p>
                  <br></br>
                  <h2 style={{ fontWeight: "bold" }} id="products">Products</h2>
                  <p>All products are subject to availability. We reserve the right to
                    discontinue any products at any time for any reason. Prices for all
                    products are subject to change.</p>
                  <br></br>
                  <h2 style={{ fontWeight: "bold" }} id="payments">Payments</h2>
                  <p>We may provide paid products and/or services within Service. In that
                    case, we use third-party services for payment processing (e.g. payment
                    processors).</p>
                  <p>We will not store or collect your payment card details. That
                    information is provided directly to our third-party payment processors
                    whose use of your personal information is governed by their Privacy
                    Policy. These payment processors adhere to the standards set by PCI-DSS
                    as managed by the PCI Security Standards Council, which is a joint
                    effort of brands like Visa, Mastercard, American Express and Discover.
                    PCI-DSS requirements help ensure the secure handling of payment
                    information.</p>
                  <p>The payment processors we work with are:</p>
                  <h3 id="stripe">Stripe:</h3>
                  <p>Their Privacy Policy can be viewed at:
                    https://stripe.com/privacy</p>
                  <br></br>
                  <h2 style={{ fontWeight: "bold" }} id="terms-related-to-your-use-of-the-products">Terms related to your
                    use of the Products:</h2>
                  <p>After completion of the purchase of the Products by person or entity
                    who originally purchased the Products Drake Rossman hereby grants to you a
                    revocable, non-exclusive, non-transferable, non-sublicensable and
                    limited right and license to access and use the Products you have
                    purchased access to. You may download the Products via our Service. The
                    download link will be sent via the email specified in the form during the
                    checkout process.</p>
                  <br></br>
                  <h2 style={{ fontWeight: "bold" }} id="refund-policy">Refund Policy</h2>
                  <p>Full refund of the original purchase price of the Products will be
                    granted by Drake Rossman to the person or entity who originally
                    purchased the Products if a refund is requested within fourteen (14) days
                    of purchase date by contacting the Drake Rossman at
                    drake.rossman@protonmail.com.</p>
                  <br></br>
                  <h2 style={{ fontWeight: "bold" }} id="privacy-policy">Privacy Policy</h2>
                  <p>We care about data privacy and security. Please review our Privacy
                    Policy: https://nixosbook.com/privacy-policy. By using the Services, you
                    agree to be bound by our Privacy Policy, which is incorporated into
                    these Legal Terms. Please be advised the Services are hosted in the
                    United States. If you access the Services from any other region of the
                    world with laws or other requirements governing personal data
                    collection, use, or disclosure that differ from applicable laws in the
                    United States, then through your continued use of the Services, you are
                    transferring your data to the United States, and you expressly consent
                    to have your data transferred to and processed in the United States.
                    Further, we do not knowingly accept, request, or solicit information
                    from children or knowingly market to children. Therefore, in accordance
                    with the U.S. Children’s Online Privacy Protection Act, if we receive
                    actual knowledge that anyone under the age of 13 has provided personal
                    information to us without the requisite and verifiable parental consent,
                    we will delete that information from the Services as quickly as is
                    reasonably practical.</p>
                  <br></br>
                  <h2 style={{ fontWeight: "bold" }} id="modifications-and-interruptions">Modifications and
                    Interruptions</h2>
                  <p>We reserve the right to change, modify, or remove the contents of the
                    Services at any time or for any reason at our sole discretion without
                    notice. However, we have no obligation to update any information on our
                    Services. We will not be liable to you or any third party for any
                    modification, price change, suspension, or discontinuance of the
                    Services.</p>
                  <p>We cannot guarantee the Services will be available at all times. We
                    may experience hardware, software, or other problems or need to perform
                    maintenance related to the Services, resulting in interruptions, delays,
                    or errors. We reserve the right to change, revise, update, suspend,
                    discontinue, or otherwise modify the Services at any time or for any
                    reason without notice to you. You agree that we have no liability
                    whatsoever for any loss, damage, or inconvenience caused by your
                    inability to access or use the Services during any downtime or
                    discontinuance of the Services. Nothing in these Legal Terms will be
                    construed to obligate us to maintain and support the Services or to
                    supply any corrections, updates, or releases in connection
                    therewith.</p>
                  <br></br>
                  <h2 style={{ fontWeight: "bold" }} id="corrections">Corrections</h2>
                  <p>There may be information on the Services that contains typographical
                    errors, inaccuracies, or omissions, including descriptions, pricing,
                    availability, and various other information. We reserve the right to
                    correct any errors, inaccuracies, or omissions and to change or update
                    the information on the Services at any time, without prior notice.</p>
                  <br></br>
                  <h2 style={{ fontWeight: "bold" }} id="disclaimer">Disclaimer</h2>
                  <p>THE SERVICES ARE PROVIDED ON AN AS-IS AND AS-AVAILABLE BASIS. YOU
                    AGREE THAT YOUR USE OF THE SERVICES WILL BE AT YOUR SOLE RISK. TO THE
                    FULLEST EXTENT PERMITTED BY LAW, WE DISCLAIM ALL WARRANTIES, EXPRESS OR
                    IMPLIED, IN CONNECTION WITH THE SERVICES AND YOUR USE THEREOF,
                    INCLUDING, WITHOUT LIMITATION, THE IMPLIED WARRANTIES OF
                    MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
                    WE MAKE NO WARRANTIES OR REPRESENTATIONS ABOUT THE ACCURACY OR
                    COMPLETENESS OF THE SERVICES’ CONTENT OR THE CONTENT OF ANY WEBSITES OR
                    MOBILE APPLICATIONS LINKED TO THE SERVICES AND WE WILL ASSUME NO
                    LIABILITY OR RESPONSIBILITY FOR ANY (1) ERRORS, MISTAKES, OR
                    INACCURACIES OF CONTENT AND MATERIALS, (2) PERSONAL INJURY OR PROPERTY
                    DAMAGE, OF ANY NATURE WHATSOEVER, RESULTING FROM YOUR ACCESS TO AND USE
                    OF THE SERVICES, (3) ANY UNAUTHORIZED ACCESS TO OR USE OF OUR SECURE
                    SERVERS AND/OR ANY AND ALL PERSONAL INFORMATION AND/OR FINANCIAL
                    INFORMATION STORED THEREIN, (4) ANY INTERRUPTION OR CESSATION OF
                    TRANSMISSION TO OR FROM THE SERVICES, (5) ANY BUGS, VIRUSES, TROJAN
                    HORSES, OR THE LIKE WHICH MAY BE TRANSMITTED TO OR THROUGH THE SERVICES
                    BY ANY THIRD PARTY, AND/OR (6) ANY ERRORS OR OMISSIONS IN ANY CONTENT
                    AND MATERIALS OR FOR ANY LOSS OR DAMAGE OF ANY KIND INCURRED AS A RESULT
                    OF THE USE OF ANY CONTENT POSTED, TRANSMITTED, OR OTHERWISE MADE
                    AVAILABLE VIA THE SERVICES. WE DO NOT WARRANT, ENDORSE, GUARANTEE, OR
                    ASSUME RESPONSIBILITY FOR ANY PRODUCT OR SERVICE ADVERTISED OR OFFERED
                    BY A THIRD PARTY THROUGH THE SERVICES, ANY HYPERLINKED WEBSITE, OR ANY
                    WEBSITE OR MOBILE APPLICATION FEATURED IN ANY BANNER OR OTHER
                    ADVERTISING, AND WE WILL NOT BE A PARTY TO OR IN ANY WAY BE RESPONSIBLE
                    FOR MONITORING ANY TRANSACTION BETWEEN YOU AND ANY THIRD-PARTY PROVIDERS
                    OF PRODUCTS OR SERVICES. AS WITH THE PURCHASE OF A PRODUCT OR SERVICE
                    THROUGH ANY MEDIUM OR IN ANY ENVIRONMENT, YOU SHOULD USE YOUR BEST
                    JUDGMENT AND EXERCISE CAUTION WHERE APPROPRIATE.</p>
                  <br></br>
                  <h2 style={{ fontWeight: "bold" }} id="limitations-of-liability">Limitations of Liability</h2>
                  <p>IN NO EVENT WILL WE ARE LIABLE TO YOU OR ANY THIRD PARTY FOR ANY
                    DIRECT, INDIRECT, CONSEQUENTIAL, EXEMPLARY, INCIDENTAL, SPECIAL, OR
                    PUNITIVE DAMAGES, INCLUDING LOST PROFIT, LOST REVENUE, LOSS OF DATA, OR
                    OTHER DAMAGES ARISING FROM YOUR USE OF THE SERVICES, EVEN IF WE HAVE
                    BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES. NOTWITHSTANDING
                    ANYTHING TO THE CONTRARY CONTAINED HEREIN, OUR LIABILITY TO YOU FOR ANY
                    CAUSE WHATSOEVER AND REGARDLESS OF THE FORM OF THE ACTION, WILL AT ALL
                    TIMES BE LIMITED TO THE AMOUNT PAID, IF ANY, BY YOU TO US DURING THE six
                    (6) mONTH PERIOD PRIOR TO ANY CAUSE OF ACTION ARISING. CERTAIN US STATE
                    LAWS AND INTERNATIONAL LAWS DO NOT ALLOW LIMITATIONS ON IMPLIED
                    WARRANTIES OR THE EXCLUSION OR LIMITATION OF CERTAIN DAMAGES. IF THESE
                    LAWS APPLY TO YOU, SOME OR ALL OF THE ABOVE DISCLAIMERS OR LIMITATIONS
                    MAY NOT APPLY TO YOU, AND YOU MAY HAVE ADDITIONAL RIGHTS.</p>
                  <br></br>
                  <h2 style={{ fontWeight: "bold" }} id="indemnification">Indemnification</h2>
                  <p>You agree to defend, indemnify, and hold us harmless, including our
                    subsidiaries, affiliates, and all of our respective officers, agents,
                    partners, and employees, from and against any loss, damage, liability,
                    claim, or demand, including reasonable attorneys’ fees and expenses,
                    made by any third party due to or arising out of: (1) use of the
                    Services; (2) breach of these Legal Terms; (3) any breach of your
                    representations and warranties set forth in these Legal Terms; (4) your
                    violation of the rights of a third party, including but not limited to
                    intellectual property rights; or (5) any overt harmful act toward any
                    other user of the Services with whom you connected via the Services.
                    Notwithstanding the foregoing, we reserve the right, at your expense, to
                    assume the exclusive defense and control of any matter for which you are
                    required to indemnify us, and you agree to cooperate, at your expense,
                    with our defense of such claims. We will use reasonable efforts to
                    notify you of any such claim, action, or proceeding which is subject to
                    this indemnification upon becoming aware of it.</p>
                  <br></br>
                  <h2 style={{ fontWeight: "bold" }} id="user-data">User Data</h2>
                  <p>We will maintain certain data that you transmit to the Services for
                    the purpose of managing the performance of the Services, as well as data
                    relating to your use of the Services. Although we perform regular
                    routine backups of data, you are solely responsible for all data that
                    you transmit or that relates to any activity you have undertaken using
                    the Services. You agree that we shall have no liability to you for any
                    loss or corruption of any such data, and you hereby waive any right of
                    action against us arising from any such loss or corruption of such
                    data.</p>
                  <br></br>
                  <h2 style={{ fontWeight: 'bold' }}
                    id="electronic-communications-transactions-and-signatures">Electronic
                    Communications Transactions and Signatures</h2>
                  <p>Visiting the Services, sending us emails, and completing online forms
                    constitute electronic communications. You consent to receive electronic
                    communications, and you agree that all agreements, notices, disclosures,
                    and other communications we provide to you electronically, via email and
                    on the Services, satisfy any legal requirement that such communication
                    be in writing. YOU HEREBY AGREE TO THE USE OF ELECTRONIC SIGNATURES,
                    CONTRACTS, ORDERS, AND OTHER RECORDS, AND TO ELECTRONIC DELIVERY OF
                    NOTICES, POLICIES, AND RECORDS OF TRANSACTIONS INITIATED OR COMPLETED BY
                    US OR VIA THE SERVICES. You hereby waive any rights or requirements
                    under any statutes, regulations, rules, ordinances, or other laws in any
                    jurisdiction which require an original signature or delivery or
                    retention of non-electronic records, or to payments or the granting of
                    credits by any means other than electronic means.</p>
                  <br></br>
                  <h2 style={{ fontWeight: "bold" }} id="california-users-and-residents">California Users and
                    Residents</h2>
                  <p>If any complaint with us is not satisfactorily resolved, you can
                    contact the Complaint Assistance Unit of the Division of Consumer
                    Services of the California Department of Consumer Affairs in writing at
                    1625 North Market Blvd., Suite N 112, Sacramento, California 95834 or by
                    telephone at (800) 952-5210 or (916) 445-1254.</p>
                  <br></br>
                  <h2 style={{ fontWeight: "bold" }} id="miscellaneous">Miscellaneous</h2>
                  <p>These Legal Terms and any policies or operating rules posted by us on
                    the Services or in respect to the Services constitute the entire
                    agreement and understanding between you and us. Our failure to exercise
                    or enforce any right or provision of these Legal Terms shall not operate
                    as a waiver of such right or provision. These Legal Terms operate to the
                    fullest extent permissible by law. We may assign any or all of our
                    rights and obligations to others at any time. We shall not be
                    responsible or liable for any loss, damage, delay, or failure to act
                    caused by any cause beyond our reasonable control. If any provision or
                    part of a provision of these Legal Terms is determined to be unlawful,
                    void, or unenforceable, that provision or part of the provision is
                    deemed severable from these Legal Terms and does not affect the validity
                    and enforceability of any remaining provisions. There is no joint
                    venture, partnership, employment or agency relationship created between
                    you and us as a result of these Legal Terms or use of the Services. You
                    agree that these Legal Terms will not be construed against us by virtue
                    of having drafted them. You hereby waive any and all defenses you may
                    have based on the electronic form of these Legal Terms and the lack of
                    signing by the parties hereto to execute these Legal Terms.</p>
                  <br></br>
                  <h2 style={{ fontWeight: "bold" }} id="contact-us">Contact Us</h2>
                  <p>If you have any questions about this Terms and Conditions, please
                    contact us:</p>
                  <p>By email: drake.rossman@protonmail.com.</p>
                </>
              </div>
            <DialogFooter>
              <Button onClick={handleTosModalClose}>OK</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {showPrivacyModal && (
        <Dialog open={showPrivacyModal} onOpenChange={handlePrivacyModalClose}>
          <DialogContent className="bg-gray-800 text-white p-6 rounded-lg shadow-lg max-w-4xl">
            <DialogHeader>
            </DialogHeader>
            <div style={{ maxHeight: '70vh', overflowY: 'auto' }}>

              <>
                <h1 id="privacy-policy">Privacy Policy</h1>
                <p><strong>Effective date:</strong> 08/14/2024</p>
                <br></br>
                <h2 style={{ fontWeight: 'bold' }} id="introduction">Introduction</h2>
                <p>Welcome to Drake Rossman.</p>
                <p>Drake Rossman (“us”, “we”, or “our”) operates <a
                  href="https://nixosbook.com">https://nixosbook.com</a> (hereinafter
                  referred to as “Service”).</p>
                <p>Our Privacy Policy governs your visit to <a
                  href="https://nixosbook.com">https://nixosbook.com</a> and explains how
                  we collect, safeguard, and disclose information that results from your
                  use of our Service.</p>
                <p>We use your data to provide and improve the Service. By using the
                  Service, you agree to the collection and use of information in
                  accordance with this policy. Unless otherwise defined in this Privacy
                  Policy, the terms used have the same meanings as in our Terms and
                  Conditions.</p>
                <p>Our Terms and Conditions (“Terms”) govern all use of our Service and,
                  together with the Privacy Policy, constitute your agreement with us
                  (“agreement”).</p>
                <br></br>
                <h2 style={{ fontWeight: 'bold' }} id="definitions">Definitions</h2>
                <ul>
                  <li><strong>SERVICE</strong> means the <a
                    href="https://nixosbook.com">https://nixosbook.com</a> website operated
                    by Drake Rossman.</li>
                  <li><strong>PERSONAL DATA</strong> means data about a living individual
                    who can be identified from those data (or from those and other
                    information either in our possession or likely to come into our
                    possession).</li>
                  <li><strong>USAGE DATA</strong> is data collected automatically, either
                    generated by the use of the Service or from the Service infrastructure
                    itself (for example, the duration of a page visit).</li>
                  <li><strong>DATA CONTROLLER</strong> means a natural or legal person who
                    (either alone or jointly or in common with other persons) determines the
                    purposes for which and the manner in which any personal data are, or are
                    to be, processed. For the purpose of this Privacy Policy, we are a Data
                    Controller of your data.</li>
                  <li><strong>DATA PROCESSORS (OR SERVICE PROVIDERS)</strong> means any
                    natural or legal person who processes the data on behalf of the Data
                    Controller. We may use the services of various Service Providers to
                    process your data more effectively.</li>
                  <li><strong>DATA SUBJECT</strong> is any living individual who is the
                    subject of Personal Data.</li>
                  <li><strong>THE USER</strong> is the individual using our Service. The
                    User corresponds to the Data Subject, who is the subject of Personal
                    Data.</li>
                </ul>
                <br></br>
                <h2 style={{ fontWeight: 'bold' }} id="information-collection-and-use">Information Collection and
                  Use</h2>
                <p>We collect several different types of information for various
                  purposes to provide and improve our Service to you.</p>
                <h3 id="types-of-data-collected">Types of Data Collected</h3>
                <h4 id="personal-data">Personal Data</h4>
                <p>While using our Service, we may ask you to provide us with certain
                  personally identifiable information that can be used to contact or
                  identify you (“Personal Data”). Personally identifiable information may
                  include, but is not limited to:</p>
                <ul>
                  <li>Email address</li>
                  <li>First name and last name</li>
                  <li>Address, State, Province, ZIP/Postal code, City</li>
                  <li>Usage Data</li>
                </ul>
                <p>We may use your Personal Data to contact you with newsletters,
                  marketing or promotional materials, and other information that may be of
                  interest to you. You may opt out of receiving any, or all, of these
                  communications from us by following the unsubscribe link or by emailing
                  us at drake.rossman@protonmail.com.</p>
                <h4 id="usage-data">Usage Data</h4>
                <p>We may also collect information that your browser sends whenever you
                  visit our Service or when you access Service by or through a mobile
                  device (“Usage Data”).</p>
                <p>This Usage Data may include information such as your computer’s
                  Internet Protocol address (e.g. IP address), browser type, browser
                  version, the pages of our Service that you visit, the time and date of
                  your visit, the time spent on those pages, unique device identifiers,
                  and other diagnostic data.</p>
                <p>When you access Service with a mobile device, this Usage Data may
                  include information such as the type of mobile device you use, your
                  mobile device unique ID, the IP address of your mobile device, your
                  mobile operating system, the type of mobile Internet browser you use,
                  unique device identifiers, and other diagnostic data.</p>
                <br></br>
                <h2 style={{ fontWeight: 'bold' }} id="use-of-data">Use of Data</h2>
                <p>Drake Rossman uses the collected data for various purposes:</p>
                <ul>
                  <li>To provide and maintain our Service;</li>
                  <li>To notify you about changes to our Service;</li>
                  <li>To allow you to participate in interactive features of our Service
                    when you choose to do so;</li>
                  <li>To provide customer support;</li>
                  <li>To gather analysis or valuable information so that we can improve
                    our Service;</li>
                  <li>To monitor the usage of our Service;</li>
                  <li>To detect, prevent and address technical issues;</li>
                  <li>To fulfill any other purpose for which you provide it;</li>
                  <li>To carry out our obligations and enforce our rights arising from any
                    contracts entered into between you and us, including for billing and
                    collection;</li>
                  <li>To provide you with notices about your account and/or subscription,
                    including expiration and renewal notices, email-instructions, etc.;</li>
                  <li>To provide you with news, special offers, and general information
                    about other goods, services, and events which we offer that are similar
                    to those that you have already purchased or enquired about unless you
                    have opted not to receive such information;</li>
                  <li>In any other way we may describe when you provide the
                    information;</li>
                  <li>For any other purpose with your consent.</li>
                </ul>
                <br></br>
                <h2 style={{ fontWeight: 'bold' }} id="retention-of-data">Retention of Data</h2>
                <p>We will retain your Personal Data only for as long as is necessary
                  for the purposes set out in this Privacy Policy. We will retain and use
                  your Personal Data to the extent necessary to comply with our legal
                  obligations (for example, if we are required to retain your data to
                  comply with applicable laws), resolve disputes, and enforce our legal
                  agreements and policies.</p>
                <p>We will also retain Usage Data for internal analysis purposes. Usage
                  Data is generally retained for a shorter period, except when this data
                  is used to strengthen the security or to improve the functionality of
                  our Service, or we are legally obligated to retain this data for longer
                  time periods.</p>
                <br></br>
                <h2 style={{ fontWeight: 'bold' }} id="transfer-of-data">Transfer of Data</h2>
                <p>Your information, including Personal Data, may be transferred to –
                  and maintained on – computers located outside of your state, province,
                  country, or other governmental jurisdiction where the data protection
                  laws may differ from those of your jurisdiction.</p>
                <p>If you are located outside the United States and choose to provide
                  information to us, please note that we transfer the data, including
                  Personal Data, to the United States and process it there.</p>
                <p>Your consent to this Privacy Policy followed by your submission of
                  such information represents your agreement to that transfer.</p>
                <p>Drake Rossman will take all the steps reasonably necessary to ensure
                  that your data is treated securely and in accordance with this Privacy
                  Policy, and no transfer of your Personal Data will take place to an
                  organization or a country unless there are adequate controls in place
                  including the security of your data and other personal information.</p>
                <br></br>
                <h2 style={{ fontWeight: 'bold' }} id="disclosure-of-data">Disclosure of Data</h2>
                <p>We may disclose personal information that we collect, or you
                  provide:</p>
                <h3 id="other-cases">Other cases</h3>
                <p>We may disclose your information also:</p>
                <ul>
                  <li>To contractors, service providers, and other third parties we use to
                    support our business;</li>
                </ul>
                <br></br>
                <h2 style={{ fontWeight: 'bold' }} id="security-of-data">Security of Data</h2>
                <p>The security of your data is important to us but remember that no
                  method of transmission over the Internet or method of electronic storage
                  is 100% secure. While we strive to use commercially acceptable means to
                  protect your Personal Data, we cannot guarantee its absolute
                  security.</p>
                <br></br>
                <h2 style={{ fontWeight: 'bold' }}
                  id="your-data-protection-rights-under-general-data-protection-regulation-gdpr">Your
                  Data Protection Rights Under General Data Protection Regulation
                  (GDPR)</h2>
                <p>If you are a resident of the European Union (EU) and European
                  Economic Area (EEA), you have certain data protection rights, covered by
                  GDPR. – See more at <a
                    href="https://eur-lex.europa.eu/eli/reg/2016/679/oj">https://eur-lex.europa.eu/eli/reg/2016/679/oj</a>.</p>
                <p>We aim to take reasonable steps to allow you to correct, amend,
                  delete, or limit the use of your Personal Data.</p>
                <p>If you wish to be informed what Personal Data we hold about you and
                  if you want it to be removed from our systems, please email us at
                  drake.rossman@protonmail.com.</p>
                <p>In certain circumstances, you have the following data protection
                  rights:</p>
                <ul>
                  <li>The right to access, update, or delete the information we have on
                    you;</li>
                  <li>The right of rectification. You have the right to have your
                    information rectified if that information is inaccurate or
                    incomplete;</li>
                  <li>The right to object. You have the right to object to our processing
                    of your Personal Data;</li>
                  <li>The right of restriction. You have the right to request that we
                    restrict the processing of your personal information;</li>
                  <li>The right to data portability. You have the right to be provided
                    with a copy of your Personal Data in a structured, machine-readable, and
                    commonly used format;</li>
                  <li>The right to withdraw consent. You also have the right to withdraw
                    your consent at any time where we rely on your consent to process your
                    personal information;</li>
                </ul>
                <p>Please note that we may ask you to verify your identity before
                  responding to such requests. Please note, we may not be able to provide
                  Service without some necessary data.</p>
                <p>You have the right to complain to a Data Protection Authority about
                  our collection and use of your Personal Data. For more information,
                  please contact your local data protection authority in the European
                  Economic Area (EEA).</p>
                <br></br>
                <h2 style={{ fontWeight: 'bold' }} id="service-providers">Service Providers</h2>
                <p>We may employ third party companies and individuals to facilitate our
                  Service (“Service Providers”), provide Service on our behalf, perform
                  Service-related services or assist us in analysing how our Service is
                  used.</p>
                <p>These third parties have access to your Personal Data only to perform
                  these tasks on our behalf and are obligated not to disclose or use it
                  for any other purpose.</p>
                <h3 id="analytics">Analytics</h3>
                <p>We may use third-party Service Providers to monitor and analyze the
                  use of our Service.</p>
                <h4 id="goatcounter">Goatcounter</h4>
                <p>Goutcounter is an open source website analytics platform built. For
                  more information about PostHog, please visit their Privacy Policy:
                  https://www.goatcounter.com/help/privacy</p>
                <h3 id="payments">Payments</h3>
                <p>We may provide paid products and/or services within Service. In that
                  case, we use third-party services for payment processing (e.g. payment
                  processors).</p>
                <p>We will not store or collect your payment card details. That
                  information is provided directly to our third-party payment processors
                  whose use of your personal information is governed by their Privacy
                  Policy. These payment processors adhere to the standards set by PCI-DSS
                  as managed by the PCI Security Standards Council, which is a joint
                  effort of brands like Visa, Mastercard, American Express and Discover.
                  PCI-DSS requirements help ensure the secure handling of payment
                  information.</p>
                <p>The payment processors we work with are:</p>
                <h4 id="stripe">Stripe:</h4>
                <p>Their Privacy Policy can be viewed at:
                    https://stripe.com/privacy</p>
                <br></br>
                <h2 style={{ fontWeight: 'bold' }} id="links-to-other-sites">Links to Other Sites</h2>
                <p>Our Service may contain links to other sites that are not operated by
                  us. If you click a third party link, you will be directed to that third
                  party’s site. We strongly advise you to review the Privacy Policy of
                  every site you visit.</p>
                <p>We have no control over and assume no responsibility for the content,
                  privacy policies or practices of any third party sites or services.</p>
                <br></br>
                <h2 style={{ fontWeight: 'bold' }} id="childrens-privacy">Children’s Privacy</h2>
                <p>Our Services are not intended for use by children under the age of 13
                  (“Children”).</p>
                <p>We do not knowingly collect personally identifiable information from
                  Children under 13. If you become aware that a Child has provided us with
                  Personal Data, please contact us. If we become aware that we have
                  collected Personal Data from Children without verification of parental
                  consent, we take steps to remove that information from our servers.</p>
                <br></br>
                <h2 style={{ fontWeight: 'bold' }} id="changes-to-this-privacy-policy">Changes to This Privacy
                  Policy</h2>
                <p>We may update our Privacy Policy from time to time. We will notify
                  you of any changes by posting the new Privacy Policy on this page.</p>
                <p>We will let you know via email and/or a prominent notice on our
                  Service, prior to the change becoming effective and update “effective
                  date” at the top of this Privacy Policy.</p>
                <p>You are advised to review this Privacy Policy periodically for any
                  changes. Changes to this Privacy Policy are effective when they are
                  posted on this page.</p>
                <br></br>
                <h2 style={{ fontWeight: 'bold' }} id="contact-us">Contact Us</h2>
                <p>If you have any questions about this Privacy Policy, please contact
                  us:</p>
                <p>By email: drake.rossman@protonmail.com.</p>
              </>

            </div>
            <DialogFooter>
              <Button onClick={handlePrivacyModalClose}>OK</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      <script data-goatcounter="https://nixosbook.goatcounter.com/count"
          async src="//gc.zgo.at/count.js">

      </script>
        <footer className="md:visible bg-gray-900 py-5 footer absolute bottom-0 w-full">
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
              <a className="text-gray-400 underline cursor-pointer" onClick={handleTosModalOpen}>
                Terms and Conditions
              </a>
            </span>
            <span>
              <a className="text-gray-400 underline cursor-pointer" onClick={handlePrivacyModalOpen}>
                Privacy Policy
              </a>
            </span>
          </div>
        </footer>
        <footer className="md:invisible bg-gray-900 py-5 footer absolute bottom-0 w-full">
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
          </div>
          <div className="mt-4 container mx-auto px-4 md:px-6 flex justify-center items-center space-x-6">
            <span>
              <a className="text-gray-400 underline cursor-pointer" onClick={handleTosModalOpen}>
                Terms and Conditions
              </a>
            </span>
            <span>
              <a className="text-gray-400 underline cursor-pointer" onClick={handlePrivacyModalOpen}>
                Privacy Policy
              </a>
            </span>
          </div>
        </footer>
    </div>)
  );
}
