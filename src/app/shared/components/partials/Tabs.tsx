import { useEffect, useState } from 'react';

const Tabs = (props) => {
  const { tabs } = props;
  const [selectedTab, setSelectedTab] = useState(0);
  const [data, setData] = useState([])

  const onChangeTab = (idx: number) => {
    setSelectedTab(idx);
  };

  useEffect(() => {
    if (tabs && tabs.length) {
      setData(tabs);
    }
  }, [tabs]);

  return (
    <div className="tabs-wrapper">
      <ul className="tab-list">
        {
          data.map((tab: any, ind: number) => (
            <li
              className={ `tab-item ${ selectedTab === ind ? 'active' : '' }` }
              key={ ind }
              onClick={ () => onChangeTab(ind) }
            >
              { tab.label }
            </li>
          ))
        }
      </ul>
      <div className="tab-content">
        {
          data?.[selectedTab] &&
          <div className={ `tab-pane ${selectedTab}` }>
            { data?.[selectedTab]?.paneElm }
          </div>
        }
      </div>
    </div>
  );
};

export default Tabs;
