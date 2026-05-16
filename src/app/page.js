"use client";

import { useState } from "react";
import Modal from "../app/components/Modal";
import Auth from "../app/components/Auth";
import Navbar from "../app/components/Navbar";
import Footer from "../app/components/Footer";
import Image from "next/image";
import { AiFillFileText, AiFillBulb, AiFillAudio } from "react-icons/ai";
import landing from "../app/assets/landing.png";
import { BsStarFill, BsStarHalf } from "react-icons/bs";
import { BiCrown } from "react-icons/bi";
import { RiLeafLine } from "react-icons/ri";
import RotatingHeadings from "../app/components/RotatingHeadings";

export default function Home() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState("login");
  const features = [
    { icon: <AiFillFileText />,
      title: "Read or listen",
      subTitle: "Save time by getting the core ideas from the best books." },
    { icon: <AiFillBulb />,
      title: "Find your next read",
      subTitle: "Explore book lists and personalized recommendations." },
    { icon: <AiFillAudio />,
      title: "Briefcasts",
      subTitle: "Gain valuable insights from briefcasts." },
  ];
  const statistics = [
    { number: "93%",
      title: `of Summarist members <b>significantly increase</b> reading frequency.` },
    { number: "96%",
      title: `of Summarist members <b>establish better</b> habits.` },
    { number: "90%",
      title: `have made <b>significant positive</b> change to their lives.` },
  ];
  const statistics2 = [
    { number: "91%",
      title: `of Summarist members <b>report feeling more productive</b> after incorporating the service into their daily routine.` },
    { number: "94%",
      title: `of Summarist members have <b>noticed an improvement</b> in their overall comprehension and retention of information.` },
    { number: "88%",
      title: `of Summarist members <b>feel more informed</b> about current events and industry trends since using the platform.` },
  ];
  const reviews = [
    { name: "Hanna M.",
      body: `This app has been a <b>game-changer</b> for me! It's saved me so much time and effort in reading and comprehending books. Highly recommend it to all book lovers.` },
    { name: "David B.",
      body: `I love this app! It provides <b>concise and accurate summaries</b> of books in a way that is easy to understand. It's also very user-friendly and intuitive.` },
    { name: "Nathan S.",
      body: `This app is a great way to get the main takeaways from a book without having to read the entire thing. <b>The summaries are well-written and informative.</b> Definitely worth downloading.` },
    { name: "Ryan R.",
      body: `If you're a busy person who <b>loves reading but doesn't have the time</b> to read every book in full, this app is for you! The summaries are thorough and provide a great overview of the book's content.` },
  ];

  return (
    <>
      <Modal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)}>
        <Auth
          onClose={() => setIsAuthModalOpen(false)}
          mode={authMode}
          setMode={setAuthMode}
        />
      </Modal>

      <Navbar
        onLoginClick={() => {
          setAuthMode("login");
          setIsAuthModalOpen(true);
        }}
      />

      <section id="landing">
        <div className="container">
          <div className="row">
            <div className="landing__wrapper">
              <div className="landing__content">
                <div className="landing__content__title">
                  Gain more knowledge <br className="remove--tablet" />
                  in less time
                </div>
                <div className="landing__content__subtitle">
                  Great summaries for busy people,
                  <br className="remove--tablet" />
                  individuals who barely have time to read,
                  <br className="remove--tablet" />
                  and even people who don’t like to read.
                </div>
                <button
                  className="btn home__cta--btn"
                  onClick={() => setIsAuthModalOpen(true)}
                >
                  Login
                </button>
              </div>
              <figure className="landing__image--mask">
                <Image src={landing} alt="landing" priority />
              </figure>
            </div>
          </div>
        </div>
      </section>

      <section id="features">
        <div className="container">
          <div className="row">
            <div className="section__title">
              Understand books in few minutes
            </div>
            <div className="features__wrapper">
              {features.map((feat, index) => (
                <div className="features" key={feat.id || feat.title}>
                  <div className="features__icon">{feat.icon}</div>
                  <div className="features__title">{feat.title}</div>
                  <div className="features__sub--title">{feat.subTitle}</div>
                </div>
              ))}
            </div>
            <div className="statistics__wrapper">
              <RotatingHeadings
                items={[
                  "Enhance your knowledge",
                  "Achieve greater success",
                  "Improve your health",
                  "Develop better parenting skills",
                  "Increase happiness",
                  "Be the best version of yourself!",
                ]}
              />
              <div className="statistics__content--details">
                {statistics.map((stat, index) => (
                  <div className="statistics__data" key={index}>
                    <div className="statistics__data--number">
                      {stat.number}
                    </div>
                    <div className="statistics__data--title" dangerouslySetInnerHTML={{ __html: stat.title }} />
                  </div>
                ))}
              </div>
            </div>
            <div className="statistics__wrapper">
              <div className="statistics__content--details statistics__content--details-second">
                {statistics2.map((stat, index) => (
                  <div className="statistics__data" key={index}>
                    <div className="statistics__data--number">
                      {stat.number}
                    </div>
                    <div className="statistics__data--title" dangerouslySetInnerHTML={{ __html: stat.title }} />
                  </div>
                ))}
              </div>
              <RotatingHeadings
                items={[
                  "Expand your learning",
                  "Accomplish your goals",
                  "Strengthen your vitality",
                  "Become a better caregiver",
                  "Improve your mood",
                  "Maximize your abilities",
                ]}
              />
            </div>
          </div>
        </div>
      </section>

      <section id="reviews">
        <div className="row">
          <div className="container">
            <div className="section__title">What our members say</div>
            <div className="reviews__wrapper">
              {reviews.map((review, index) => (
                <div className="review" key={index}>
                  <div className="review__header">
                    <div className="review__name">{review.name}</div>
                    <div className="review__stars">
                      <BsStarFill />
                      <BsStarFill />
                      <BsStarFill />
                      <BsStarFill />
                      <BsStarFill />
                    </div>
                  </div>
                  <div className="review__body" dangerouslySetInnerHTML={{ __html: review.body }} />
                </div>
              ))}
            </div>
            <div className="reviews__btn--wrapper">
              <button
                className="btn home__cta--btn"
                onClick={() => {
                  setAuthMode("login");
                  setIsAuthModalOpen(true);
                }}
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </section>

      <section id="numbers">
        <div className="container">
          <div className="row">
            <div className="section__title">
              Start growing with Summarist now
            </div>
            <div className="numbers__wrapper">
              <div className="numbers">
                <div className="numbers__icon">
                  <BiCrown />
                </div>
                <div className="numbers__title">3 Million</div>
                <div className="numbers__sub--title">
                  Downloads on all platforms
                </div>
              </div>
              <div className="numbers">
                <div className="numbers__icon numbers__star--icon">
                  <BsStarFill />
                  <BsStarFill />
                  <BsStarFill />
                  <BsStarFill />
                  <BsStarHalf />
                </div>
                <div className="numbers__title">4.5 Stars</div>
                <div className="numbers__sub--title">
                  Average ratings on iOS and Google Play
                </div>
              </div>
              <div className="numbers">
                <div className="numbers__icon">
                  <RiLeafLine />
                </div>
                <div className="numbers__title">97%</div>
                <div className="numbers__sub--title">
                  Of Summarist members create a better reading habit
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </>
  );
}
