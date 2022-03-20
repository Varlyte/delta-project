import React, { useState } from "react";
import PropTypes from "prop-types";

export const Tab = ({ title, onClick, active = false, showCategorie, categorieId }) => {
  const onClickTab = e => {
    e.preventDefault(0);
    onClick(title);
    showCategorie(e, categorieId)
  };

  return (
    <>
      <li className={`${active ? "active" : ""} tab-item`} onClick={onClickTab}>
        {title}
      </li>

      <style jsx="true">{`
        li.tab-item {
          list-style-type: none;
          padding: 1rem 2rem;
          background-color: #464646;
          font-weight: bold;
          transition: all 0.5s ease;
        }
        li.tab-item:hover,
        li.tab-item.active {
          background-color: #B4AAAA;
        }
      `}</style>
    </>
  );
};

export default function Tabs({ child }) {
  const [activeTab, setActiveTab] = useState(child[0].props.title);

  const onClickTabItem = tab => setActiveTab(tab);
  return (
    <>
      <div className="tabs">
        <ul className="tab-list">
          {child.map(tab => {
            const { title } = tab.props;

            return (
              <Tab
                key={title}
                title={title}
                onClick={onClickTabItem}
                active={title === activeTab ? true : false}
                showCategorie={tab.props.onClick}
                categorieId={tab.key}
              />
            );
          })}
        </ul>

        <div className="tab-content">
          {child.map(tab => {
            if (tab.props.title !== activeTab) return undefined;

            return tab.props.children;
          })}
        </div>
      </div>

      <style jsx="true">{`
        .tab-list {
          padding: 0;
          display: flex;
          justify-content: center;
        }
        .tab-content {
          padding: 0 1rem;
          text-align: center;
        }
        .tab-content p {
          text-align: justify;
        }
      `}</style>
    </>
  );
}

Tab.propTypes = {
  title: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};

Tabs.propTypes = {
  child: PropTypes.instanceOf(Array).isRequired
};