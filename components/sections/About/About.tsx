import Profile from "../Profile/Profile";
import styles from "./About.module.css";

export default function About() {
  return (
    <>
      <Profile
        name="Hi! i'm Aris"
        bio="I'm a software developer passionate about creating innovative solutions."
        avatarUrl="https://avatars.githubusercontent.com/u/282287673?v=4"
      />
      <section className={styles.section}>
        <h2>About Me</h2>
        <p>
          I'm a passionate software developer with a love for creating innovative solutions
          and clean, efficient code. I enjoy working with modern technologies and constantly
          learning new things.
        </p>
        <p>
          When I'm not coding, you can find me exploring new tech, contributing to open source,
          or enjoying my favorite music on Last.fm.
        </p>
      </section>
    </>
  );
}
