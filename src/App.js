import React from 'react';
import { Switch, Route } from 'react-router-dom';
import NavBar from './NavBar';
import GroupsList from './GroupsList';
import Group from './Group';
import AddGroup from './AddGroup';
import './App.css';

const CHROME_STORAGE_GROUPS_KEY = 'groups';
const CHROME_STORAGE_COLOR_KEY = 'color';
const DEFAULT_COLOR = '#607d8b';

const App = () => {
  const [groups, setGroups] = React.useState([]);
  const [color, setColor] = React.useState('');
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
  const addGroup = (name, baseLink) => {
    const newStorage = [...groups, { name, baseLink, links: [] }];
    set(newStorage);
  };
  const addLinkToGroup = (name, linkName, destination) => {
    const group = groups.find(item => item.name === name);
    const groupLinks = group.links;
    const newGroupLinks = [...group.links, { name: linkName, destination }];
    const newGroup = { ...group, links: newGroupLinks };
    const otherGroups = groups.filter(item => item.name !== name);
    const newStorage = [...otherGroups, newGroup];
    set(newStorage);
  };
  const deleteGroup = (name) => {
    const newStorage = groups.filter(group => group.name !== name);
    set(newStorage);
  };
  const deleteLinkFromGroup = (groupName, linkName) => {
    const group = groups.find(item => item.name === groupName);
    const newGroupLinks = group.links.filter(item => item.name !== linkName);
    const newGroup = { ...group, links: newGroupLinks };
    const otherGroups = groups.filter(item => item.name !== groupName);
    const newStorage = [...otherGroups, newGroup];
    set(newStorage);
  };
  return (
    <div className="App">
      <NavBar color={color} />
      <Switch>
        <Route exact path="/">
          <GroupsList groups={groups} deleteGroup={deleteGroup} />
          <AddGroup add={addGroup} />
        </Route>
        <Route exact path="/:group" render={(rrProps) => {
          const groupName = rrProps.match.params.group;
          const group = groups.find(g => g.name === groupName);
          return <Group add={addLinkToGroup} group={group} deleteLink={deleteLinkFromGroup} />;
        }} />
      </Switch>
    </div>
  );
};

export default App;
