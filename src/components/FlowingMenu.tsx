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

// Skill data for each category
const skillData: Record<string, Array<{ name: string; logo: string }>> = {
  'EDA Tools': [
    { name: 'KiCad', logo: 'https://upload.wikimedia.org/wikipedia/commons/5/59/KiCad-Logo.svg' },
    { name: 'Altium', logo: 'https://seeklogo.com/images/A/altium-logo-8C2E086C3E-seeklogo.com.png' },
    { name: 'Eagle', logo: 'https://seeklogo.com/images/A/autodesk-eagle-logo-8B5B33E4F8-seeklogo.com.png' }
  ],
  'Design Concepts': [
    { name: 'High-Speed', logo: 'https://cdn-icons-png.flaticon.com/512/2920/2920235.png' },
    { name: 'Power Delivery', logo: 'https://cdn-icons-png.flaticon.com/512/3176/3176369.png' }
  ],
  'Microcontrollers & IDEs': [
    { name: 'ARM Cortex-M', logo: 'https://upload.wikimedia.org/wikipedia/commons/3/39/ARM_logo.svg' },
    { name: 'PIC', logo: 'https://upload.wikimedia.org/wikipedia/commons/9/95/Microchip-Logo.svg' },
    { name: '8051', logo: 'https://cdn-icons-png.flaticon.com/512/2103/2103633.png' },
    { name: 'Arduino IDE', logo: 'https://cdn.worldvectorlogo.com/logos/arduino-1.svg' },
    { name: 'VS Code', logo: 'https://upload.wikimedia.org/wikipedia/commons/9/9a/Visual_Studio_Code_1.35_icon.svg' }
  ],
  'Programming': [
    { name: 'C++', logo: 'https://upload.wikimedia.org/wikipedia/commons/1/18/ISO_C%2B%2B_Logo.svg' },
    { name: 'C', logo: 'https://upload.wikimedia.org/wikipedia/commons/1/18/C_Programming_Language.svg' },
    { name: 'Python', logo: 'https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg' }
  ],
  'Version Control': [
    { name: 'Git', logo: 'https://git-scm.com/images/logos/downloads/Git-Icon-1788C.png' },
    { name: 'GitHub', logo: 'https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png' }
  ],
  'Simulation & Prototyping': [
    { name: 'LTspice', logo: 'https://www.analog.com/media/en/news-marketing-collateral/solutions-bulletins-brochures/LTspice_Icon_RGB.png' },
    { name: 'Proteus', logo: 'https://www.labcenter.com/images/proteus_icon.png' },
    { name: 'Breadboard', logo: 'https://cdn-icons-png.flaticon.com/512/2103/2103658.png' }
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
            <div className="marquee__img" style={{ backgroundImage: `url(${skill.logo})` }} />
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