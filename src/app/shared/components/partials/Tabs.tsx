import { useEffect, useState } from 'react';

const Tabs = (props) => {
  const { tabs, children, callback } = props;
  const [selectedTab, setSelectedTab] = useState(0);
  const [activePosition, setActivePosition] = useState<any>({});

  useEffect(() => {
    const elm = document.getElementsByClassName('tab-item active')[0];
    const elmLeftPosition = elm.getBoundingClientRect().left;
    const elmWidth = elm.getBoundingClientRect().width;

    setActivePosition(prev => {
      prev.left = elmLeftPosition;
      prev.width = elmWidth;
      return prev;
    });
  }, [selectedTab]);

  const onChangeTab = (idx: number) => {
    setSelectedTab(idx);

    if (callback && typeof callback === 'function') {
      callback(idx);
    }
  };

  return (
    <div className="tabs-wrapper">
      <div className="tab-list">
        {
          tabs.map((tab: any, ind: number) => (
            <div
              className={ `tab-item ${ selectedTab === ind ? 'active' : '' }` }
              key={ ind }
              onClick={ () => onChangeTab(ind) }
            >{ tab }</div>
          ))
        }
        <div className="active-bar" style={ activePosition ? { left: `${activePosition?.left - 20}px`, width: `${activePosition?.width}px` } : {}} />
      </div>
      <div className="tab-content">
        { children }
      </div>
    </div>
  );
};

export default Tabs;
