import React from 'react';
import { Outlet, Link } from 'react-router-dom';

const CoffeeChat: React.FC = () => {
  return (
    <div>
      <ul>

        <li>
          <Link to="/coffeechat/ExploreCoffeeChat">Explore Coffee Chat</Link>
        </li>
        <li>
          <Link to="/coffeechat/RegisterCoffeeChat">Register Coffee Chat</Link>
        </li>
      </ul>
      <Outlet />
    </div>
  );
};
export default CoffeeChat;



