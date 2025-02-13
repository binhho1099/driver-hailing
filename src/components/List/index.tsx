import React from 'react';

type TListData = {
  key: string;
  title: string;
  value: string | React.ReactNode;
};

interface ListProps {
  data: TListData[];
}

const List = (props: ListProps) => {
  const { data } = props;
  return (
    <div className="grid gap-2.5">
      {data.map((item) => (
        <div key={item.key} className="flex items-start gap-2.5">
          <p className="font-medium w-[150px] line-clamp-2">{item.title}</p>
          <p>{item.value}</p>
        </div>
      ))}
    </div>
  );
};

export default List;
