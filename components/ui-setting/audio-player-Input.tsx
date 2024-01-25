import { viewOneFileUploadAPI } from '@/api-site/upload';
import { PostModel } from '@/types/post';
import { UploadFolderType, UploadModel } from '@/types/upload';
import { useRef } from 'react';
import ReactH5AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import { HiOutlineLockClosed } from 'react-icons/hi';

interface Props {
  uploads: UploadModel[];
  folder: UploadFolderType;
  post?: PostModel;
  urlMedia?: string;
  enableUrlMedia?: boolean;
}

const AudioPlayerInput: React.FC<Props> = ({
  uploads,
  folder,
  post,
  urlMedia,
  enableUrlMedia,
}) => {
  const player = useRef(null);

  return (
    <>
      <ReactH5AudioPlayer
        autoPlay={false}
        autoPlayAfterSrcChange={false}
        src={
          ['MEMBERSHIP'].includes(String(post?.whoCanSee))
            ? post?.isValidSubscribe === 1
              ? enableUrlMedia
                ? urlMedia
                : `${viewOneFileUploadAPI({
                    folder: folder,
                    fileName: uploads[0]?.path ?? '',
                  })}`
              : ''
            : enableUrlMedia
              ? urlMedia
              : `${viewOneFileUploadAPI({
                  folder: folder,
                  fileName: uploads[0]?.path ?? '',
                })}`
        }
        // src="https://unpot-dev.s3.eu-west-2.amazonaws.com/posts/05779949-a4bf-4e03-9ee7-22fb3f1b285d-20231104FVnOiZrz.mp3"
        layout="stacked-reverse"
        timeFormat="auto"
        progressJumpSteps={{
          backward: 15000,
          forward: 15000,
        }}
        customIcons={{
          play: (
            <>
              <svg
                className="size-10 text-black dark:text-white"
                width="44"
                height="44"
                viewBox="0 0 44 44"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M22 0C9.87 0 0 9.87 0 22C0 34.13 9.87 44 22 44C34.13 44 44 34.13 44 22C44 9.87 34.13 0 22 0ZM29.908 22.984L17.804 30.296C17.6304 30.3998 17.4323 30.4556 17.2301 30.4578C17.0278 30.4599 16.8286 30.4083 16.6529 30.3082C16.4771 30.2081 16.3311 30.0631 16.2297 29.8881C16.1284 29.7131 16.0753 29.5143 16.076 29.312V14.688C16.0747 14.4855 16.1274 14.2863 16.2286 14.1109C16.3298 13.9355 16.4759 13.7902 16.6519 13.69C16.8278 13.5898 17.0273 13.5383 17.2298 13.5407C17.4323 13.5432 17.6305 13.5995 17.804 13.704L29.908 21.016C30.0769 21.1188 30.2164 21.2633 30.3133 21.4356C30.4101 21.608 30.461 21.8023 30.461 22C30.461 22.1977 30.4101 22.392 30.3133 22.5644C30.2164 22.7367 30.0769 22.8812 29.908 22.984Z"
                  fill="currentColor"
                ></path>
              </svg>
            </>
          ),
          pause: (
            <>
              <svg
                className="size-10 text-black dark:text-white"
                width="44"
                height="44"
                viewBox="0 0 44 44"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M22 0C9.87 0 0 9.87 0 22C0 34.13 9.87 44 22 44C34.13 44 44 34.13 44 22C44 9.87 34.13 0 22 0ZM18.616 28.77C18.616 29.219 18.4376 29.6496 18.1201 29.9671C17.8026 30.2846 17.372 30.463 16.923 30.463C16.474 30.463 16.0434 30.2846 15.7259 29.9671C15.4084 29.6496 15.23 29.219 15.23 28.77V15.23C15.23 14.781 15.4084 14.3504 15.7259 14.0329C16.0434 13.7154 16.474 13.537 16.923 13.537C17.372 13.537 17.8026 13.7154 18.1201 14.0329C18.4376 14.3504 18.616 14.781 18.616 15.23V28.77ZM28.77 28.77C28.77 29.219 28.5916 29.6496 28.2741 29.9671C27.9566 30.2846 27.526 30.463 27.077 30.463C26.628 30.463 26.1974 30.2846 25.8799 29.9671C25.5624 29.6496 25.384 29.219 25.384 28.77V15.23C25.384 14.781 25.5624 14.3504 25.8799 14.0329C26.1974 13.7154 26.628 13.537 27.077 13.537C27.526 13.537 27.9566 13.7154 28.2741 14.0329C28.5916 14.3504 28.77 14.781 28.77 15.23V28.77Z"
                  fill="currentColor"
                ></path>
              </svg>
            </>
          ),
          rewind: (
            <>
              <svg
                className="size-8 text-gray-400 hover:text-black dark:hover:text-white"
                width="48"
                height="48"
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M34 13.034C31.04 11.056 27.56 10.0002 24 10C21.712 10 20.106 10.078 18.984 10.2C17.946 10.316 17.084 10.492 16.49 10.85C16.2439 10.9911 16.0311 11.1834 15.8658 11.4139C15.7005 11.6444 15.5867 11.9077 15.532 12.186C15.4865 12.4517 15.4987 12.724 15.5677 12.9845C15.6368 13.245 15.761 13.4877 15.932 13.696C16.1422 13.9553 16.4054 14.1667 16.704 14.316L16.712 14.322L16.722 14.328H16.728V14.33C16.73 14.33 16.732 14.33 17.454 12.864L16.732 14.332C16.9319 14.4301 17.1496 14.4864 17.372 14.4974C17.5944 14.5084 17.8167 14.4739 18.0253 14.396C18.2338 14.3181 18.4243 14.1985 18.5851 14.0444C18.7458 13.8904 18.8734 13.7051 18.96 13.5C19.074 13.484 19.2 13.468 19.346 13.452C20.298 13.346 21.768 13.272 24 13.272C26.9124 13.2724 29.7592 14.1363 32.1806 15.7546C34.6019 17.3729 36.4891 19.6728 37.6034 22.3635C38.7178 25.0543 39.0092 28.015 38.4409 30.8714C37.8727 33.7278 36.4702 36.3515 34.4109 38.4109C32.3515 40.4702 29.7278 41.8727 26.8714 42.4409C24.015 43.0092 21.0543 42.7178 18.3635 41.6034C15.6728 40.4891 13.3729 38.6019 11.7546 36.1806C10.1363 33.7592 9.2724 30.9124 9.272 28C9.272 27.7852 9.22968 27.5724 9.14747 27.3739C9.06525 27.1754 8.94474 26.9951 8.79283 26.8432C8.64091 26.6913 8.46056 26.5707 8.26207 26.4885C8.06358 26.4063 7.85084 26.364 7.636 26.364C7.42116 26.364 7.20842 26.4063 7.00993 26.4885C6.81144 26.5707 6.63109 26.6913 6.47917 26.8432C6.32726 26.9951 6.20675 27.1754 6.12453 27.3739C6.04232 27.5724 6 27.7852 6 28C5.99989 31.1098 6.80546 34.1665 8.33818 36.8724C9.87091 39.5782 12.0785 41.8407 14.7458 43.4395C17.4131 45.0383 20.4491 45.9188 23.558 45.9952C26.6668 46.0716 29.7424 45.3412 32.485 43.8753C35.2276 42.4094 37.5436 40.2579 39.2073 37.6306C40.8711 35.0033 41.8257 31.9898 41.9783 28.8838C42.1309 25.7777 41.4762 22.6852 40.0779 19.9074C38.6797 17.1297 36.5857 14.7617 34 13.034Z"
                  fill="currentColor"
                ></path>
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M25.498 2.488C25.1721 2.1751 24.7378 2.00037 24.286 2.00037C23.8342 2.00037 23.3999 2.1751 23.074 2.488L14.5 10.822C14.3414 10.9745 14.2152 11.1574 14.129 11.3598C14.0428 11.5622 13.9984 11.78 13.9984 12C13.9984 12.22 14.0428 12.4378 14.129 12.6402C14.2152 12.8426 14.3414 13.0255 14.5 13.178L23.072 21.512C23.3976 21.8254 23.832 22.0004 24.284 22.0004C24.7359 22.0004 25.1703 21.8254 25.496 21.512C25.6549 21.3595 25.7814 21.1765 25.8677 20.9738C25.9541 20.7712 25.9986 20.5533 25.9986 20.333C25.9986 20.1128 25.9541 19.8948 25.8677 19.6922C25.7814 19.4896 25.6549 19.3065 25.496 19.154L18.138 12L25.498 4.84601C25.6569 4.69351 25.7834 4.51046 25.8697 4.30785C25.9561 4.10524 26.0006 3.88726 26.0006 3.66701C26.0006 3.44675 25.9561 3.22877 25.8697 3.02616C25.7834 2.82355 25.6569 2.6405 25.498 2.488Z"
                  fill="currentColor"
                ></path>
                <path
                  d="M20.1 35.52V24H18.828C18.52 25.136 17.628 25.416 15.778 25.416V26.698H18.446V35.518H20.098L20.1 35.52ZM29.772 25.4V24H22.928V30.236H24.398C25.0148 29.877 25.7186 29.695 26.432 29.71C27.92 29.71 28.774 30.566 28.774 31.95C28.774 33.348 27.958 34.334 26.468 34.334C25.162 34.334 24.236 33.742 24.218 32.376H22.566C22.566 34.596 24.126 35.734 26.45 35.734C28.956 35.734 30.444 34.104 30.444 31.898C30.444 29.644 28.902 28.312 26.668 28.312C25.724 28.312 25.016 28.508 24.598 28.74V25.4H29.772Z"
                  fill="currentColor"
                ></path>
              </svg>
            </>
          ),
          forward: (
            <>
              <svg
                className="size-8 text-gray-400 hover:text-black dark:hover:text-white"
                width="48"
                height="48"
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M14 13.034C16.96 11.056 20.44 10.0002 24 10C26.288 10 27.894 10.078 29.016 10.2C30.054 10.316 30.916 10.492 31.51 10.85C31.7559 10.9913 31.9686 11.1836 32.1339 11.4141C32.2991 11.6446 32.4131 11.9078 32.468 12.186C32.5135 12.4517 32.5013 12.724 32.4323 12.9845C32.3632 13.245 32.239 13.4877 32.068 13.696C31.8619 13.9514 31.6043 14.1606 31.312 14.31L31.296 14.318L31.288 14.322C31.2847 14.3241 31.2814 14.3261 31.278 14.328H31.272V14.33C31.27 14.33 31.268 14.33 30.546 12.864L31.268 14.332C31.0683 14.4302 30.8506 14.4866 30.6283 14.4977C30.406 14.5089 30.1838 14.4745 29.9753 14.3968C29.7667 14.3191 29.5762 14.1997 29.4154 14.0458C29.2546 13.892 29.1268 13.7069 29.04 13.502C28.9116 13.4841 28.7829 13.4681 28.654 13.454C27.702 13.348 26.232 13.274 24 13.274C21.087 13.274 18.2394 14.1378 15.8174 15.7563C13.3953 17.3747 11.5076 19.675 10.3929 22.3663C9.27825 25.0576 8.9867 28.019 9.55514 30.876C10.1236 33.733 11.5265 36.3573 13.5864 38.417C15.6464 40.4766 18.2709 41.8792 21.1279 42.4473C23.985 43.0153 26.9464 42.7234 29.6376 41.6083C32.3287 40.4933 34.6288 38.6053 36.2469 36.183C37.865 33.7607 38.7284 30.913 38.728 28C38.728 27.5661 38.9004 27.15 39.2072 26.8432C39.514 26.5364 39.9301 26.364 40.364 26.364C40.7979 26.364 41.214 26.5364 41.5208 26.8432C41.8276 27.15 42 27.5661 42 28C42.0001 31.1098 41.1945 34.1665 39.6618 36.8724C38.1291 39.5782 35.9215 41.8407 33.2542 43.4395C30.5869 45.0383 27.5509 45.9188 24.442 45.9952C21.3332 46.0716 18.2576 45.3412 15.515 43.8753C12.7724 42.4094 10.4564 40.2579 8.79266 37.6306C7.12893 35.0033 6.17426 31.9898 6.02168 28.8838C5.86911 25.7777 6.52383 22.6852 7.92206 19.9074C9.32028 17.1297 11.4143 14.7617 14 13.034Z"
                  fill="currentColor"
                ></path>
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M22.502 2.488C22.8279 2.1751 23.2622 2.00037 23.714 2.00037C24.1658 2.00037 24.6001 2.1751 24.926 2.488L33.498 10.822C33.6566 10.9745 33.7828 11.1574 33.869 11.3598C33.9552 11.5622 33.9996 11.78 33.9996 12C33.9996 12.22 33.9552 12.4378 33.869 12.6402C33.7828 12.8426 33.6566 13.0255 33.498 13.178L24.926 21.512C24.6003 21.8254 24.1659 22.0004 23.714 22.0004C23.262 22.0004 22.8277 21.8254 22.502 21.512C22.3431 21.3595 22.2166 21.1765 22.1302 20.9738C22.0439 20.7712 21.9993 20.5533 21.9993 20.333C21.9993 20.1128 22.0439 19.8948 22.1302 19.6922C22.2166 19.4896 22.3431 19.3065 22.502 19.154L29.862 12L22.502 4.84601C22.3431 4.69351 22.2166 4.51046 22.1302 4.30785C22.0439 4.10524 21.9993 3.88726 21.9993 3.66701C21.9993 3.44675 22.0439 3.22877 22.1302 3.02616C22.2166 2.82355 22.3431 2.6405 22.502 2.488Z"
                  fill="currentColor"
                ></path>
                <path
                  d="M20.1 35.52V24H18.828C18.52 25.136 17.628 25.416 15.778 25.416V26.698H18.446V35.518H20.098L20.1 35.52ZM29.772 25.4V24H22.928V30.236H24.398C25.0148 29.877 25.7186 29.695 26.432 29.71C27.92 29.71 28.774 30.566 28.774 31.95C28.774 33.348 27.958 34.334 26.468 34.334C25.162 34.334 24.236 33.742 24.218 32.376H22.566C22.566 34.596 24.126 35.734 26.45 35.734C28.956 35.734 30.444 34.104 30.444 31.898C30.444 29.644 28.902 28.312 26.668 28.312C25.724 28.312 25.016 28.508 24.598 28.74V25.4H29.772Z"
                  fill="currentColor"
                ></path>
              </svg>
            </>
          ),
        }}
        defaultCurrentTime="00:00"
        defaultDuration="00:00"
        customVolumeControls={[]}
        customAdditionalControls={[]}
        className="relative rounded-lg"
        ref={player}
        style={{ boxShadow: 'none', background: 'transparent' }}
        header={
          <>
            {['MEMBERSHIP'].includes(String(post?.whoCanSee)) &&
            post?.isValidSubscribe !== 1 ? (
              <button className={`font-normal`}>
                <HiOutlineLockClosed className="size-8" />
              </button>
            ) : null}
          </>
        }
        footer={
          <>
            <span
              className={`${
                ['MEMBERSHIP'].includes(String(post?.whoCanSee)) &&
                post?.isValidSubscribe !== 1
                  ? 'absolute inset-0'
                  : ''
              }`}
            />
          </>
        }
      />
    </>
  );
};

export { AudioPlayerInput };
