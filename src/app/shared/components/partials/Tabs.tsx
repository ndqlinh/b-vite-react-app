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
    <div className="flex flex-col flex-1">
      <div className="mb-4 border-b border-gray-200 dark:border-gray-700">
        <ul
          className="flex flex-wrap -mb-px text-sm font-medium text-center"
          id="default-tab"
          data-tabs-toggle="#default-tab-content"
          role="tablist"
        >
          {tabs.map((tab: any, ind: number) => (
            <li
              key={ind}
              className="me-2"
              role="presentation"
              onClick={onChangeTab.bind(this, ind)}
            >
              <button
                className={`inline-block p-4 rounded-t-lg capitalize ${
                  selectedTab === ind ? 'border-b-2 border-blue-500' : ''
                }`}
                id={`${tab.name}-tab`}
                data-tabs-target={`#${tab.name}`}
                type="button"
                role="tab"
                aria-controls={tab.name}
                aria-selected="false"
              >
                {tab.name}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div id="tab-content">
        <div
          className="py-4 rounded-lg"
          id={tabs[selectedTab].name}
          role="tabpanel"
          aria-labelledby={`${tabs[selectedTab].name}-tab`}
        >
          {tabs[selectedTab].children}
        </div>
      </div>
    </div>

    // <div className="tabs-wrapper">
    //   <div className="tab-list">
    //     {
    //       tabs.map((tab: any, ind: number) => (
    //         <div
    //           className={ `tab-item ${ selectedTab === ind ? 'active' : '' }` }
    //           key={ ind }
    //           onClick={ () => onChangeTab(ind) }
    //         >{ tab }</div>
    //       ))
    //     }
    //     <div
    //       className="active-bar"
    //       style={ activePosition ? { left: `${activePosition?.left - 20}px`, width: `${activePosition?.width}px` } : {}} />
    //   </div>
    //   <div className="tab-content">
    //     { children }
    //   </div>
    // </div>
  );
};

export default Tabs;
