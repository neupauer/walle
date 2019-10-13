import React from "react";
import Text from "../Components/Text";
import Container from "../Components/Container";
import ControlPanel from "../Components/ControlPanel";
import Icon from "../Icon";

const DashboardScreen = () => {
  return (
    <Container className="mt-8">
      <div className="flex flex-wrap">
        <div className="w-full lg:w-1/2">
          <div className="flex flex-row items-center justify-between mr-4 px-4">
            <div className="flex flex-col">
              <Text category="c2">Control Panel</Text>
              <Text category="h1">Project Wall-E</Text>
            </div>

            <div className="flex flex-row">
              <Icon.Wifi className="stroke-current text-indigo-500 inline-block h-6 w-6" />
              <Icon.Battery
                className="stroke-current  text-indigo-500 inline-block h-6 w-6 ml-4"
                title="83%"
              />
            </div>
          </div>
        </div>
        <div className="w-full lg:w-1/2 ml-4 px-4"></div>
      </div>

      <div className="flex flex-wrap mt-6 mb-12">
        <div className="w-full lg:w-1/2">
          <div className="px-4">
          <ControlPanel />
          </div>
        </div>
        <div className="w-full lg:w-1/2">
          <div className="px-4">
            <div className="">
              <Text category="c2">Dashboard</Text>
              <div className="flex items-center justify-between bg-gray-100 w-full h-64 mt-2 px-24 rounded-lg shadow-lg">
                <Icon.Dashboard className="text-gray-500 h-12 w-12" />
                <Icon.DashboardLights className="text-gray-500 h-12 w-12" />
                <Icon.Wrench className="text-gray-500 h-12 w-12" />
              </div>
            </div>
            <div className="mt-4">
              <Text category="c2">Camera</Text>
              <div className="flex items-center justify-center bg-gray-800 w-full h-64 mt-2 rounded-lg shadow-lg">
                <Icon.Camera className="text-gray-600 h-32 w-32" />
              </div>
            </div>
            <div className="mt-4">
              <Text category="c2">Sensors</Text>
              <div className="flex items-center justify-center bg-gray-100 w-full h-64 mt-2 rounded-lg shadow-lg">
                <Icon.Distance className="text-gray-400 h-32 w-32" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default DashboardScreen;
