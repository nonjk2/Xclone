import { TrendingData, TrendingTopic } from "@/__test__/MockData";
import { Icon } from "@/components/ui/icon/GoogleIcon";
import { threedot } from "@/lib/Icon";

const TrendItem: React.FC<TrendingTopic> = (props) => {
  const { category, postsCount, topic } = props;

  // const moveNavigateHandler = () => {
  //   dispatch(inputSet({ inputValue: hashTag }));
  //   nevigate("/explore");
  // };
  return (
    <article className="cursor-pointer h-[82px] w-full py-3 px-4 hover:bg-opacity-5">
      <div className="flex flex-row justify-between">
        <div className="main">
          <div className="h-4 w-full text-inputColor text-sm">{category}</div>
          <div className="h-5 w-full font-semibold pt-[2px]">{topic}</div>
          <div className="h-4 text-inputColor text-sm w-full mt-1">
            {postsCount} Tweets
          </div>
        </div>
        <div className="w-[34.75px] h-[34.75px] flex items-center justify-center rounded-full transition-all duration-300 hover:bg-hoverLightBlue">
          <Icon
            color="rgb(15, 20, 25)"
            height={5}
            width={5}
            path={threedot}
            isHover={true}
          />
        </div>
      </div>
    </article>
  );
};

export default TrendItem;
