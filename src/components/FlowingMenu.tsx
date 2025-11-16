import React from 'react';
import { gsap } from 'gsap';

import './FlowingMenu.css';

interface MenuItemProps {
  link: string;
  text: string;
  image: string;
}

interface FlowingMenuProps {
  items?: MenuItemProps[];
}

const FlowingMenu: React.FC<FlowingMenuProps> = ({ items = [] }) => {
  return (
    <div className="menu-wrap">
      <nav className="menu">
        {items.map((item, idx) => (
          <MenuItem key={idx} {...item} />
        ))}
      </nav>
    </div>
  );
};

// Skill data for each category with proper logos
const skillData: Record<string, Array<{ name: string; logo: string }>> = {
  'EDA Tools': [
    { name: 'KiCad', logo: 'https://upload.wikimedia.org/wikipedia/commons/5/59/KiCad-Logo.svg' },
    { name: 'Altium', logo: 'https://cdn.brandfetch.io/idMJBtjmlS/w/400/h/400/theme/dark/icon.png?c=1bxid64Mup7aczewSAYMX&t=1760410315440' },
    { name: 'Eagle', logo: 'https://harmless-tapir-303.convex.cloud/api/storage/8a4cb0bf-4622-4ab1-95e3-222e27df31c6' },
    { name: 'Proteus', logo: 'https://harmless-tapir-303.convex.cloud/api/storage/23b7cd07-646a-41c0-b0b5-9e00429968e4' }
  ],
  'Design Concepts': [
    { name: 'High-Speed Design', logo: 'https://cdn-icons-png.flaticon.com/512/2920/2920235.png' },
    { name: 'Power Delivery', logo: 'https://cdn-icons-png.flaticon.com/512/3176/3176369.png' },
    { name: 'Signal Integrity', logo: 'https://cdn-icons-png.flaticon.com/512/2103/2103633.png' }
  ],
  'Microcontrollers & IDEs': [
    { name: 'ARM Cortex-M', logo: 'https://harmless-tapir-303.convex.cloud/api/storage/bc0aac65-b084-4c40-81f5-d0a807090310' },
    { name: 'PIC', logo: 'https://cdn-icons-png.flaticon.com/512/2103/2103633.png' },
    { name: '8051', logo: 'https://harmless-tapir-303.convex.cloud/api/storage/8a5d8c78-ef48-432a-8bbd-eb6b8346d2b5' },
    { name: 'Arduino IDE', logo: 'https://cdn.worldvectorlogo.com/logos/arduino-1.svg' },
    { name: 'VS Code', logo: 'https://upload.wikimedia.org/wikipedia/commons/9/9a/Visual_Studio_Code_1.35_icon.svg' },
    { name: 'Keil', logo: 'https://harmless-tapir-303.convex.cloud/api/storage/ec179b8b-3369-4ad4-8622-d4d4d2aaebbc' },
    { name: 'STM32CubeIDE', logo: 'https://harmless-tapir-303.convex.cloud/api/storage/746becf9-7f73-4baa-8562-4762e7c77ab6' }
  ],
  'Programming': [
    { name: 'C++', logo: 'https://upload.wikimedia.org/wikipedia/commons/1/18/ISO_C%2B%2B_Logo.svg' },
    { name: 'C', logo: 'https://upload.wikimedia.org/wikipedia/commons/1/18/C_Programming_Language.svg' },
    { name: 'Python', logo: 'https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg' },
    { name: 'Assembly', logo: 'https://harmless-tapir-303.convex.cloud/api/storage/9e5fb3db-dae2-4601-a22c-47f642ed71e0' }
  ],
  'Version Control': [
    { name: 'Git', logo: 'https://git-scm.com/images/logos/downloads/Git-Icon-1788C.png' },
    { name: 'GitHub', logo: 'https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png' },
    { name: 'GitLab', logo: 'https://about.gitlab.com/images/press/logo/png/gitlab-icon-rgb.png' }
  ],
  'Simulation & Prototyping': [
    { name: 'LTspice', logo: 'https://harmless-tapir-303.convex.cloud/api/storage/6dd28a8d-40af-430a-a34f-bd337193f621' },
    { name: 'Proteus', logo: 'https://harmless-tapir-303.convex.cloud/api/storage/23b7cd07-646a-41c0-b0b5-9e00429968e4' },
    { name: 'Breadboard', logo: 'https://harmless-tapir-303.convex.cloud/api/storage/afab7057-d1c0-4c45-ba14-4635e4ac08e2' },
    { name: 'Oscilloscope', logo: 'https://harmless-tapir-303.convex.cloud/api/storage/ef3c5ec1-77c4-47a9-8946-f6845e92177b' }
  ]
};

const MenuItem: React.FC<MenuItemProps> = ({ link, text, image }) => {
  const itemRef = React.useRef<HTMLDivElement>(null);
  const marqueeRef = React.useRef<HTMLDivElement>(null);
  const marqueeInnerRef = React.useRef<HTMLDivElement>(null);

  const animationDefaults: gsap.TweenVars = { duration: 0.6, ease: 'expo' };

  const distMetric = (x: number, y: number, x2: number, y2: number): number => {
    const xDiff = x - x2;
    const yDiff = y - y2;
    return xDiff * xDiff + yDiff * yDiff;
  };

  const findClosestEdge = (mouseX: number, mouseY: number, width: number, height: number): 'top' | 'bottom' => {
    const topEdgeDist = distMetric(mouseX, mouseY, width / 2, 0);
    const bottomEdgeDist = distMetric(mouseX, mouseY, width / 2, height);
    return topEdgeDist < bottomEdgeDist ? 'top' : 'bottom';
  };

  const handleMouseEnter = (ev: React.MouseEvent<HTMLAnchorElement>) => {
    if (!itemRef.current || !marqueeRef.current || !marqueeInnerRef.current) return;
    const rect = itemRef.current.getBoundingClientRect();
    const x = ev.clientX - rect.left;
    const y = ev.clientY - rect.top;
    const edge = findClosestEdge(x, y, rect.width, rect.height);

    const tl = gsap.timeline({ defaults: animationDefaults });

    tl.set(marqueeRef.current, { y: edge === 'top' ? '-101%' : '101%' }, 0)
      .set(marqueeInnerRef.current, { y: edge === 'top' ? '101%' : '-101%' }, 0)
      .to([marqueeRef.current, marqueeInnerRef.current], { y: '0%' }, 0);
  };

  const handleMouseLeave = (ev: React.MouseEvent<HTMLAnchorElement>) => {
    if (!itemRef.current || !marqueeRef.current || !marqueeInnerRef.current) return;
    const rect = itemRef.current.getBoundingClientRect();
    const x = ev.clientX - rect.left;
    const y = ev.clientY - rect.top;
    const edge = findClosestEdge(x, y, rect.width, rect.height);

    const tl = gsap.timeline({ defaults: animationDefaults });

    tl.to(marqueeRef.current, { y: edge === 'top' ? '-101%' : '101%' }, 0).to(
      marqueeInnerRef.current,
      { y: edge === 'top' ? '101%' : '-101%' },
      0
    );
  };

  const repeatedMarqueeContent = React.useMemo(() => {
    const skills = skillData[text] || [];
    return Array.from({ length: 4 }).map((_, idx) => (
      <React.Fragment key={idx}>
        {skills.map((skill, skillIdx) => (
          <React.Fragment key={`${idx}-${skillIdx}`}>
            <span>{skill.name}</span>
            <div 
              className="marquee__img" 
              style={{ backgroundImage: `url(${skill.logo})` }}
              title={skill.name}
              role="img"
              aria-label={skill.name}
            />
          </React.Fragment>
        ))}
      </React.Fragment>
    ));
  }, [text]);

  return (
    <div className="menu__item" ref={itemRef}>
      <a className="menu__item-link" href={link} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        {text}
      </a>
      <div className="marquee" ref={marqueeRef}>
        <div className="marquee__inner-wrap" ref={marqueeInnerRef}>
          <div className="marquee__inner" aria-hidden="true">
            {repeatedMarqueeContent}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlowingMenu;