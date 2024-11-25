"use client";

import React, { useState, useEffect } from "react";

// Next
import Link from "next/link";
import Image from "next/image";
import {
  signIn,
  signOut,
  useSession,
  getProviders,
  LiteralUnion,
  ClientSafeProvider,
} from "next-auth/react";
import { BuiltInProviderType } from "next-auth/providers/index";

// Component
import LogoReveal from "../utilities/LogoReveal";

// CSS

// Image

// Logo

// External
import { easeInOut, motion } from "framer-motion";

type ProviderState = Record<
  LiteralUnion<BuiltInProviderType, string>,
  ClientSafeProvider
> | null;

interface MainHeaderProps {
  isActive: boolean;
  onMenuClick: (active: boolean) => void;
}

const MainHeader = ({ isActive, onMenuClick }: MainHeaderProps) => {
  // Authentication
  const { data: session } = useSession();
  const [providers, setProviders] = useState<ProviderState>();
  useEffect(() => {
    const setUpProviders = async () => {
      const response = await getProviders();
      setProviders(response);
    };

    setUpProviders();
  }, []);

  return (
    <motion.header
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.175, delay: 0.25, ease: easeInOut }}
      className="py-4 lg:py-6 px-6 lg:px-8 flex fixed bg-white top-0 w-full justify-between items-center z-[100]"
    >
      <LogoReveal href="/" delay={1.5}>
        aetheria
      </LogoReveal>
      {/* Make this another component later! */}
      <nav className="flex items-center">
        <motion.div
          variants={textVariant}
          initial={false}
          animate={isActive ? "open" : "close"}
        >
          {session?.user ? (
            <Link href="/profile">
              {
                <button
                  type="button"
                  className="mr-6 font-medium text-lg leading-6"
                >
                  <span className="border-b-2 border-black pb-0">
                    {session.user.name}
                  </span>
                </button>
              }
            </Link>
          ) : (
            providers &&
            Object.values(providers).map((provider) => (
              <button
                type="button"
                key={provider.name}
                onClick={() => signIn(provider.id)}
                className="font-medium text-lg border-b-2 border-black pb-0 leading-6 mr-6"
              >
                Get started
              </button>
            ))
          )}
        </motion.div>
        <motion.button
          onClick={() => onMenuClick(!isActive)}
          variants={backgroundVariant}
          initial={false}
          animate={isActive ? "open" : "close"}
          className="flex flex-col space-y-[2px] items-center justify-center w-9 h-9 rounded-full p-2 focus:outline-none"
        >
          <motion.span
            variants={topBarVariant}
            initial={false}
            animate={isActive ? "open" : "close"}
            className="w-full h-[2px]"
          />
          <motion.span
            variants={middleBarVariant}
            initial={false}
            animate={isActive ? "open" : "close"}
            className="w-full h-[2px]"
          />
          <motion.span
            variants={bottomBarVariant}
            initial={false}
            animate={isActive ? "open" : "close"}
            className="w-full h-[2px]"
          />
        </motion.button>
      </nav>
    </motion.header>
  );
};

export default MainHeader;

const textVariant = {
  open: {
    opacity: 0,
    transition: {
      duration: 0.175,
    },
  },
  close: {
    opacity: 1,
    transition: {
      duration: 0.175,
      easeInOut,
    },
  },
};

const backgroundVariant = {
  open: {
    backgroundColor: "#FFFFFF",
    transition: {
      duration: 0.175,
      easeInOut,
    },
  },
  close: {
    backgroundColor: "#4734f7",
    transition: {
      duration: 0.175,
      easeInOut,
    },
  },
};

const topBarVariant = {
  open: {
    rotate: 45,
    y: 4,
    backgroundColor: "#000000",
    transition: {
      duration: 0.25,
      easeInOut,
    },
  },
  close: {
    rotate: 0,
    y: 0,
    backgroundColor: "#FFFFFF",
    transition: {
      duration: 0.175,
      easeInOut,
    },
  },
};

const middleBarVariant = {
  open: {
    opacity: 0,
    transition: {
      duration: 0.175,
    },
  },
  close: {
    opacity: 1,
    backgroundColor: "#FFFFFF",
    transition: {
      duration: 0.175,
      easeInOut,
    },
  },
};

const bottomBarVariant = {
  open: {
    rotate: -45,
    y: -4,
    backgroundColor: "#000000",
    transition: {
      duration: 0.25,
      easeInOut,
    },
  },
  close: {
    rotate: 0,
    y: 0,
    backgroundColor: "#FFFFFF",
    transition: {
      duration: 0.175,
      easeInOut,
    },
  },
};
