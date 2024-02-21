import HomeListItemActionBar from "../main/center/home/HomeListItemActionBar";
import { mockPosts } from "@/__test__/MockPostData";
import CloseButton from "./CloseButton";
import ShortButton from "./ShortButton";
import PhotoCaroucel from "./PhotoCaroucel";
import StyleProvider from "@/context/StyleProvider";
import Avatar from "../ui/Avatar";
import IdPath from "../main/center/home/homepostaction/IdPath";
import { switchColor } from "@/lib/func";
import { ActionBarIconSvg } from "../ui/icon/GoogleIcon";
import { threedot } from "@/lib/Icon";
import PhotoBoardSection from "./PhotoBoardSection";
const DATA = mockPosts[0];

const PhotoComponents = () => {
  const postDATA = DATA;
  const { Images } = DATA;

  return (
    <StyleProvider>
      <main className="relative flex w-full max-h-screen">
        <section
          id="photo-section-1"
          className="relative flex flex-col shrink grow w-[calc(100%-350px)] h-screen"
        >
          <PhotoCaroucel images={Images} />
          <div className="h-12 min-h-[48px]">
            <HomeListItemActionBar count={postDATA._count} type="photo" photo />
          </div>
          <CloseButton />
          <ShortButton />
        </section>

        <PhotoBoardSection Post={DATA} />
      </main>
    </StyleProvider>
  );
};
export default PhotoComponents;
