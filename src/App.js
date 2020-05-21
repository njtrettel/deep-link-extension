import React from 'react';
import _ from 'lodash';
import NavBar from './NavBar';
import BaseLinks from './BaseLinks';
import List from './List';
import './App.css';

const CHROME_STORAGE_GROUPS_KEY = 'groups';
const CHROME_STORAGE_BASE_LINKS_KEY = 'base_links';
const CHROME_STORAGE_COLOR_KEY = 'color';
const DEFAULT_COLOR = '#607d8b';

const insertGroup = (group, groupToAdd) => {
  const newGroups = [...group.groups, groupToAdd];
  return { ...group, groups: newGroups };
};
const insertLink = (group, link) => {
  const newLinks = [...group.links, link];
  return { ...group, links: newLinks };
};
const removeGroup = (group, nameToRemove) => {
  const newGroups = group.groups.filter(g => g.name !== nameToRemove);
  return { ...group, groups: newGroups };
};
const removeLinkFromGroup = (group, nameToRemove) => {
  const newLinks = group.links.filter(l => l.name !== nameToRemove);
  return { ...group, links: newLinks };
};
const performActionOnGroupRecursively = (storedGroup, path, item, action) => {
  if (_.isEmpty(path)) {
    return action(storedGroup, item);
  }
  const groupName = path[0];
  const index = _.findIndex(storedGroup.groups, g => g.name === groupName);
  const before = _.slice(storedGroup.groups, 0, index);
  const after = _.slice(storedGroup.groups, index + 1);

  const group = storedGroup.groups[index] || {};
  const newGroup = performActionOnGroupRecursively(group || {}, _.tail(path), item, action);
  const inserted = {
    ...storedGroup,
    groups: [...before, newGroup, ...after]
  };
  return inserted;
};

const App = () => {
  const [baseGroup, setBaseGroup] = React.useState({});
  const [baseLinks, setBaseLinks] = React.useState([]);
  const [selectedBaseLink, setSelectedBaseLink] = React.useState(0);
  const [color, setColor] = React.useState('');

  React.useEffect(() => {
    global.chrome.storage.sync.get(CHROME_STORAGE_GROUPS_KEY, (data) => {
      setBaseGroup(data[CHROME_STORAGE_GROUPS_KEY] || { name: '__base__', links: [], groups: [] });
    });
    global.chrome.storage.sync.get(CHROME_STORAGE_BASE_LINKS_KEY, (data) => {
      setBaseLinks(data[CHROME_STORAGE_BASE_LINKS_KEY] || []);
    });
    global.chrome.storage.sync.get(CHROME_STORAGE_COLOR_KEY, (data) => {
      setColor(data[CHROME_STORAGE_COLOR_KEY] || DEFAULT_COLOR);
    });
  }, []);
  const storeGroups = (newGroup) => {
    global.chrome.storage.sync.set({ [CHROME_STORAGE_GROUPS_KEY]: newGroup });
    setBaseGroup(newGroup);
  };
  const storeBaseLinks = (newBaseLinks) => {
    global.chrome.storage.sync.set({ [CHROME_STORAGE_BASE_LINKS_KEY]: newBaseLinks });
    setBaseLinks(newBaseLinks);
  };
  const addBaseLink = (name, link) => {
    const newBaseLinks = [...baseLinks, { name, link }];
    storeBaseLinks(newBaseLinks);
  };
  const addGroup = (name, path) => {
    const groupToAdd = { name, groups: [], links: [] };
    const newGroup = performActionOnGroupRecursively({ groups: [baseGroup] }, path, groupToAdd, insertGroup);
    storeGroups(newGroup.groups[0]);
  };
  const addLinkToGroup = (name, destination, path) => {
    const linkToAdd = { name, destination };
    const newGroup = performActionOnGroupRecursively({ groups: [baseGroup] }, path, linkToAdd, insertLink);
    storeGroups(newGroup.groups[0]);
  };
  const deleteGroup = (name, path) => {
    const newGroup = performActionOnGroupRecursively({ groups: [baseGroup] }, path, name, removeGroup);
    storeGroups(newGroup.groups[0]);
  };
  const deleteLinkFromGroup = (name, path) => {
    const newGroup = performActionOnGroupRecursively({ groups: [baseGroup] }, path, name, removeLinkFromGroup);
    storeGroups(newGroup.groups[0]);
  };
  return (
    <div className="App">
      <NavBar color={color} />
      <BaseLinks
        baseLinks={baseLinks}
        selectedBaseLink={selectedBaseLink}
        setSelectedBaseLink={setSelectedBaseLink}
        addBaseLink={addBaseLink}
      />
      <List
        baseLink={baseLinks[selectedBaseLink]}
        group={baseGroup}
        addGroup={addGroup}
        deleteGroup={deleteGroup}
        addLink={addLinkToGroup}
        deleteLink={deleteLinkFromGroup}
      />
    </div>
  );
};

export default App;
