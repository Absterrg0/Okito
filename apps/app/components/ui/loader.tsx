'use client'
import React, { useState, useEffect } from 'react';

interface BanterLoaderProps {
  /**
   * Color of the loader boxes
   * @default "#fff"
   */
  color?: string;
  /**
   * Size multiplier for the loader
   * @default 1
   */
  size?: number;
  /**
   * Additional CSS class names
   */
  className?: string;
  /**
   * Whether the loader should be positioned absolutely (centered)
   * @default false
   */
  centered?: boolean;
}

export const Loader: React.FC<BanterLoaderProps> = ({
  color = '#fff',
  size = 1,
  className = '',
  centered = false,
}) => {
  const [isClient, setIsClient] = useState(false);
  const [uniqueId, setUniqueId] = useState('');

  useEffect(() => {
    setIsClient(true);
    setUniqueId(Math.random().toString(36).substring(2, 9));
  }, []);

  // Return a simple div during SSR to prevent hydration mismatch
  if (!isClient) {
    return (
      <div 
        className={`inline-block ${className}`}
        style={{
          width: `${72 * size}px`,
          height: `${72 * size}px`,
          backgroundColor: 'transparent'
        }}
      />
    );
  }
  
  return (
    <>
      <style jsx>{`
        .banter-loader-${uniqueId} {
          position: ${centered ? 'absolute' : 'relative'};
          ${centered ? `
            left: 50%;
            top: 50%;
            margin-left: ${-36 * size}px;
            margin-top: ${-36 * size}px;
          ` : `
            display: inline-block;
          `}
          width: ${72 * size}px;
          height: ${72 * size}px;
        }

        .banter-loader-${uniqueId}__box {
          float: left;
          position: relative;
          width: ${20 * size}px;
          height: ${20 * size}px;
          margin-right: ${6 * size}px;
        }

        .banter-loader-${uniqueId}__box:before {
          content: "";
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          background: ${color};
          border-radius: 50%;
          box-shadow: 
            0 2px 8px rgba(0, 0, 0, 0.15),
            0 0 0 1px rgba(255, 255, 255, 0.1);
        }

        .banter-loader-${uniqueId}__box:nth-child(3n) {
          margin-right: 0;
          margin-bottom: ${6 * size}px;
        }

        .banter-loader-${uniqueId}__box:nth-child(1):before,
        .banter-loader-${uniqueId}__box:nth-child(4):before {
          margin-left: ${26 * size}px;
        }

        .banter-loader-${uniqueId}__box:nth-child(3):before {
          margin-top: ${52 * size}px;
        }

        .banter-loader-${uniqueId}__box:last-child {
          margin-bottom: 0;
        }

        @keyframes moveBox-1-${uniqueId} {
          9.0909090909% {
            transform: translate(${-26 * size}px, 0);
          }

          18.1818181818% {
            transform: translate(0px, 0);
          }

          27.2727272727% {
            transform: translate(0px, 0);
          }

          36.3636363636% {
            transform: translate(${26 * size}px, 0);
          }

          45.4545454545% {
            transform: translate(${26 * size}px, ${26 * size}px);
          }

          54.5454545455% {
            transform: translate(${26 * size}px, ${26 * size}px);
          }

          63.6363636364% {
            transform: translate(${26 * size}px, ${26 * size}px);
          }

          72.7272727273% {
            transform: translate(${26 * size}px, 0px);
          }

          81.8181818182% {
            transform: translate(0px, 0px);
          }

          90.9090909091% {
            transform: translate(${-26 * size}px, 0px);
          }

          100% {
            transform: translate(0px, 0px);
          }
        }

        .banter-loader-${uniqueId}__box:nth-child(1) {
          animation: moveBox-1-${uniqueId} 4s infinite;
        }

        @keyframes moveBox-2-${uniqueId} {
          9.0909090909% {
            transform: translate(0, 0);
          }

          18.1818181818% {
            transform: translate(${26 * size}px, 0);
          }

          27.2727272727% {
            transform: translate(0px, 0);
          }

          36.3636363636% {
            transform: translate(${26 * size}px, 0);
          }

          45.4545454545% {
            transform: translate(${26 * size}px, ${26 * size}px);
          }

          54.5454545455% {
            transform: translate(${26 * size}px, ${26 * size}px);
          }

          63.6363636364% {
            transform: translate(${26 * size}px, ${26 * size}px);
          }

          72.7272727273% {
            transform: translate(${26 * size}px, ${26 * size}px);
          }

          81.8181818182% {
            transform: translate(0px, ${26 * size}px);
          }

          90.9090909091% {
            transform: translate(0px, ${26 * size}px);
          }

          100% {
            transform: translate(0px, 0px);
          }
        }

        .banter-loader-${uniqueId}__box:nth-child(2) {
          animation: moveBox-2-${uniqueId} 4s infinite;
        }

        @keyframes moveBox-3-${uniqueId} {
          9.0909090909% {
            transform: translate(${-26 * size}px, 0);
          }

          18.1818181818% {
            transform: translate(${-26 * size}px, 0);
          }

          27.2727272727% {
            transform: translate(0px, 0);
          }

          36.3636363636% {
            transform: translate(${-26 * size}px, 0);
          }

          45.4545454545% {
            transform: translate(${-26 * size}px, 0);
          }

          54.5454545455% {
            transform: translate(${-26 * size}px, 0);
          }

          63.6363636364% {
            transform: translate(${-26 * size}px, 0);
          }

          72.7272727273% {
            transform: translate(${-26 * size}px, 0);
          }

          81.8181818182% {
            transform: translate(${-26 * size}px, ${-26 * size}px);
          }

          90.9090909091% {
            transform: translate(0px, ${-26 * size}px);
          }

          100% {
            transform: translate(0px, 0px);
          }
        }

        .banter-loader-${uniqueId}__box:nth-child(3) {
          animation: moveBox-3-${uniqueId} 4s infinite;
        }

        @keyframes moveBox-4-${uniqueId} {
          9.0909090909% {
            transform: translate(${-26 * size}px, 0);
          }

          18.1818181818% {
            transform: translate(${-26 * size}px, 0);
          }

          27.2727272727% {
            transform: translate(${-26 * size}px, ${-26 * size}px);
          }

          36.3636363636% {
            transform: translate(0px, ${-26 * size}px);
          }

          45.4545454545% {
            transform: translate(0px, 0px);
          }

          54.5454545455% {
            transform: translate(0px, ${-26 * size}px);
          }

          63.6363636364% {
            transform: translate(0px, ${-26 * size}px);
          }

          72.7272727273% {
            transform: translate(0px, ${-26 * size}px);
          }

          81.8181818182% {
            transform: translate(${-26 * size}px, ${-26 * size}px);
          }

          90.9090909091% {
            transform: translate(${-26 * size}px, 0px);
          }

          100% {
            transform: translate(0px, 0px);
          }
        }

        .banter-loader-${uniqueId}__box:nth-child(4) {
          animation: moveBox-4-${uniqueId} 4s infinite;
        }

        @keyframes moveBox-5-${uniqueId} {
          9.0909090909% {
            transform: translate(0, 0);
          }

          18.1818181818% {
            transform: translate(0, 0);
          }

          27.2727272727% {
            transform: translate(0, 0);
          }

          36.3636363636% {
            transform: translate(${26 * size}px, 0);
          }

          45.4545454545% {
            transform: translate(${26 * size}px, 0);
          }

          54.5454545455% {
            transform: translate(${26 * size}px, 0);
          }

          63.6363636364% {
            transform: translate(${26 * size}px, 0);
          }

          72.7272727273% {
            transform: translate(${26 * size}px, 0);
          }

          81.8181818182% {
            transform: translate(${26 * size}px, ${-26 * size}px);
          }

          90.9090909091% {
            transform: translate(0px, ${-26 * size}px);
          }

          100% {
            transform: translate(0px, 0px);
          }
        }

        .banter-loader-${uniqueId}__box:nth-child(5) {
          animation: moveBox-5-${uniqueId} 4s infinite;
        }

        @keyframes moveBox-6-${uniqueId} {
          9.0909090909% {
            transform: translate(0, 0);
          }

          18.1818181818% {
            transform: translate(${-26 * size}px, 0);
          }

          27.2727272727% {
            transform: translate(${-26 * size}px, 0);
          }

          36.3636363636% {
            transform: translate(0px, 0);
          }

          45.4545454545% {
            transform: translate(0px, 0);
          }

          54.5454545455% {
            transform: translate(0px, 0);
          }

          63.6363636364% {
            transform: translate(0px, 0);
          }

          72.7272727273% {
            transform: translate(0px, ${26 * size}px);
          }

          81.8181818182% {
            transform: translate(${-26 * size}px, ${26 * size}px);
          }

          90.9090909091% {
            transform: translate(${-26 * size}px, 0px);
          }

          100% {
            transform: translate(0px, 0px);
          }
        }

        .banter-loader-${uniqueId}__box:nth-child(6) {
          animation: moveBox-6-${uniqueId} 4s infinite;
        }

        @keyframes moveBox-7-${uniqueId} {
          9.0909090909% {
            transform: translate(${26 * size}px, 0);
          }

          18.1818181818% {
            transform: translate(${26 * size}px, 0);
          }

          27.2727272727% {
            transform: translate(${26 * size}px, 0);
          }

          36.3636363636% {
            transform: translate(0px, 0);
          }

          45.4545454545% {
            transform: translate(0px, ${-26 * size}px);
          }

          54.5454545455% {
            transform: translate(${26 * size}px, ${-26 * size}px);
          }

          63.6363636364% {
            transform: translate(0px, ${-26 * size}px);
          }

          72.7272727273% {
            transform: translate(0px, ${-26 * size}px);
          }

          81.8181818182% {
            transform: translate(0px, 0px);
          }

          90.9090909091% {
            transform: translate(${26 * size}px, 0px);
          }

          100% {
            transform: translate(0px, 0px);
          }
        }

        .banter-loader-${uniqueId}__box:nth-child(7) {
          animation: moveBox-7-${uniqueId} 4s infinite;
        }

        @keyframes moveBox-8-${uniqueId} {
          9.0909090909% {
            transform: translate(0, 0);
          }

          18.1818181818% {
            transform: translate(${-26 * size}px, 0);
          }

          27.2727272727% {
            transform: translate(${-26 * size}px, ${-26 * size}px);
          }

          36.3636363636% {
            transform: translate(0px, ${-26 * size}px);
          }

          45.4545454545% {
            transform: translate(0px, ${-26 * size}px);
          }

          54.5454545455% {
            transform: translate(0px, ${-26 * size}px);
          }

          63.6363636364% {
            transform: translate(0px, ${-26 * size}px);
          }

          72.7272727273% {
            transform: translate(0px, ${-26 * size}px);
          }

          81.8181818182% {
            transform: translate(${26 * size}px, ${-26 * size}px);
          }

          90.9090909091% {
            transform: translate(${26 * size}px, 0px);
          }

          100% {
            transform: translate(0px, 0px);
          }
        }

        .banter-loader-${uniqueId}__box:nth-child(8) {
          animation: moveBox-8-${uniqueId} 4s infinite;
        }

        @keyframes moveBox-9-${uniqueId} {
          9.0909090909% {
            transform: translate(${-26 * size}px, 0);
          }

          18.1818181818% {
            transform: translate(${-26 * size}px, 0);
          }

          27.2727272727% {
            transform: translate(0px, 0);
          }

          36.3636363636% {
            transform: translate(${-26 * size}px, 0);
          }

          45.4545454545% {
            transform: translate(0px, 0);
          }

          54.5454545455% {
            transform: translate(0px, 0);
          }

          63.6363636364% {
            transform: translate(${-26 * size}px, 0);
          }

          72.7272727273% {
            transform: translate(${-26 * size}px, 0);
          }

          81.8181818182% {
            transform: translate(${-52 * size}px, 0);
          }

          90.9090909091% {
            transform: translate(${-26 * size}px, 0);
          }

          100% {
            transform: translate(0px, 0);
          }
        }

        .banter-loader-${uniqueId}__box:nth-child(9) {
          animation: moveBox-9-${uniqueId} 4s infinite;
        }
      `}</style>
      
      <div className={`banter-loader-${uniqueId} ${className}`}>
        <div className={`banter-loader-${uniqueId}__box`}></div>
        <div className={`banter-loader-${uniqueId}__box`}></div>
        <div className={`banter-loader-${uniqueId}__box`}></div>
        <div className={`banter-loader-${uniqueId}__box`}></div>
        <div className={`banter-loader-${uniqueId}__box`}></div>
        <div className={`banter-loader-${uniqueId}__box`}></div>
        <div className={`banter-loader-${uniqueId}__box`}></div>
        <div className={`banter-loader-${uniqueId}__box`}></div>
        <div className={`banter-loader-${uniqueId}__box`}></div>
      </div>
    </>
  );
};

export default Loader;