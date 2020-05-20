import React from 'react';
import _ from 'lodash';
import NavBar from './NavBar';
import List from './List';
import './App.css';

const CHROME_STORAGE_GROUPS_KEY = 'groups';
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
  const [groups, setGroups] = React.useState([]);
  const [color, setColor] = React.useState('');
  const baseGroup = { name: '__base__', baseLink: '', links: [], groups };
  React.useEffect(() => {
    global.chrome.storage.sync.get(CHROME_STORAGE_GROUPS_KEY, (data) => {
      setGroups(data[CHROME_STORAGE_GROUPS_KEY] || []);
    });
    global.chrome.storage.sync.get(CHROME_STORAGE_COLOR_KEY, (data) => {
      setColor(data[CHROME_STORAGE_COLOR_KEY] || DEFAULT_COLOR);
    });
  }, []);
  const set = (newStorage) => {
    global.chrome.storage.sync.set({ [CHROME_STORAGE_GROUPS_KEY]: newStorage });
    setGroups(newStorage);
  };
  const addGroup = (name, baseLink, path) => {
    const newGroup = { name, baseLink, groups: [], links: [] };
    const newStorage = performActionOnGroupRecursively({ groups: [baseGroup] }, path, newGroup, insertGroup);
    set(newStorage.groups[0].groups);
  };
  const addLinkToGroup = (name, destination, path) => {
    const newLink = { name, destination };
    const newStorage = performActionOnGroupRecursively({ groups: [baseGroup] }, path, newLink, insertLink);
    set(newStorage.groups[0].groups);
  };
  const deleteGroup = (name, path) => {
    const newStorage = performActionOnGroupRecursively({ groups: [baseGroup] }, path, name, removeGroup);
    set(newStorage.groups[0].groups);
  };
  const deleteLinkFromGroup = (name, path) => {
    const newStorage = performActionOnGroupRecursively({ groups: [baseGroup] }, path, name, removeLinkFromGroup);
    set(newStorage.groups[0].groups);
  };
  return (
    <div className="App">
      <NavBar color={color} />
      <List
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
