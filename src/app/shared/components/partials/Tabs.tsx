import { useEffect, useState } from 'react';

const Tabs = (props) => {
  const { tabs, children, callback } = props;
  const [selectedTab, setSelectedTab] = useState(0);

  const onChangeTab = (idx: number) => {
    setSelectedTab(idx);

    if (callback && typeof callback === 'function') {
      callback(idx);
    }
  };

  return (
    <div className="tabs-wrapper">
      <ul className="tab-list">
        {
          tabs.map((tab: any, ind: number) => (
            <li
              className={ `tab-item ${ selectedTab === ind ? 'active' : '' }` }
              key={ ind }
              onClick={ () => onChangeTab(ind) }
            >{ tab }</li>
          ))
        }
      </ul>
      <div className="tab-content">
        { children }
        {/* {
          data?.[selectedTab] &&
          <div className={ `tab-pane ${selectedTab}` }>
            { data?.[selectedTab]?.paneElm }
          </div>
        } */}
      </div>
    </div>
  );
};

export default Tabs;
