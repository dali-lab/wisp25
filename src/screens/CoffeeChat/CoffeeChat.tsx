import React from 'react';
import { Outlet, Link } from 'react-router-dom';

const CoffeeChat: React.FC = () => {
  return (
    <div>
      <h1 className="page-title">Coffee Chat Connection</h1>
      <ul>
        <li>
          <Link to="/coffeechat/ExploreCoffeeChat">Explore Coffee Chat</Link>
        </li>
        <li>
          <Link to="/coffeechat/RegisterCoffeeChat">Coffee Chat</Link>
        </li>
      </ul>
      <Outlet />
    </div>
  );
};
export default CoffeeChat;



