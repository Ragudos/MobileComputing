import { useAuth } from "@/lib/hooks";
import { combineClassesOrNone } from "@/lib/utils";
import profileStyles from "./profile.module.css";

function ProfilePage() {
    const { user } = useAuth();

    if (!user) {
        return null;
    }

    const age = user.dateOfBirth
        ? new Date().getFullYear() - new Date(user.dateOfBirth).getFullYear()
        : null;

    return (
        <main
            className={combineClassesOrNone(
                "container",
                profileStyles.container
            )}
        >
            <section className={profileStyles.section}>
                <div className={profileStyles.backgroundImageContainer}></div>
                <div className={profileStyles.contentContainer}>
                    <div
                        className={combineClassesOrNone(
                            "img-container",
                            profileStyles.imgContainer
                        )}
                    >
                        <picture>
                            <source
                                srcSet="https://placehold.co/350?text=User+Profile"
                                media="(min-width: 1200px)"
                            />
                            <source
                                srcSet="https://placehold.co/300?text=User+Profile"
                                media="(min-width: 992px)"
                            />
                            <source
                                srcSet="https://placehold.co/200?text=User+Profile"
                                media="(min-width: 768px)"
                            />
                            <img
                                src="https://placehold.co/175?text=User+Profile"
                                alt="User Profile"
                            />
                        </picture>
                    </div>
                    <div className={profileStyles.userInfoContainer}>
                        <div className={profileStyles.nameEmailContainer}>
                            <h1 className="h3">
                                {user.firstName} {user.lastName}
                            </h1>
                            <span>{user.email}</span>
                        </div>

                        <div className={profileStyles.metadataContainer}>
                            <ul>
                                <li>Gender: {user.gender}</li>
                                <li>Age: {age}</li>
                                <li>
                                    Born on:{" "}
                                    <time
                                        dateTime={new Date(
                                            user.dateOfBirth
                                        ).toISOString()}
                                    >
                                        {new Date(
                                            user.dateOfBirth
                                        ).toDateString()}
                                    </time>
                                </li>
                            </ul>
                            <ul>
                                <li>Program {user.universityProgram}</li>
                                <li>Year level: {user.yearLevel}</li>
                                <li>Graduation year: {user.graduationYear}</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}

function BackgroundImage() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            width="1440"
            height="560"
            preserveAspectRatio="none"
            viewBox="0 0 1440 560"
        >
            <g mask='url("#SvgjsMask1009")' fill="none">
                <rect
                    width="1440"
                    height="560"
                    x="0"
                    y="0"
                    fill="rgba(39, 114, 90, 1)"
                ></rect>
                <path
                    d="M 0,206 C 57.6,186.6 172.8,105.4 288,109 C 403.2,112.6 460.8,236.6 576,224 C 691.2,211.4 748.8,46.4 864,46 C 979.2,45.6 1036.8,227.6 1152,222 C 1267.2,216.4 1382.4,58.8 1440,18L1440 560L0 560z"
                    fill="rgba(69, 191, 152, 1)"
                ></path>
                <path
                    d="M 0,463 C 96,436 288,330.2 480,328 C 672,325.8 768,444.4 960,452 C 1152,459.6 1344,383.2 1440,366L1440 560L0 560z"
                    fill="rgba(160, 222, 203, 1)"
                ></path>
            </g>
            <defs>
                <mask id="SvgjsMask1009">
                    <rect width="1440" height="560" fill="#ffffff"></rect>
                </mask>
            </defs>
        </svg>
    );
}

export default ProfilePage;
