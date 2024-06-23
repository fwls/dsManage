
export const useDataSourceHook = () => {
  const options = [
    {
      label: "所有",
      value: "",
    },
    {
      label: "javascript(沙盒)",
      value: "javascript(vm)",
    },
    {
      label: "javascript(高级)",
      value: "javascript(expert)",
    },
    {
      label: "mysql",
      value: "mysql",
    },
    {
      label: "postgresql",
      value: "postgresql",
    },
  ];



  return {
    options,
  };
};
