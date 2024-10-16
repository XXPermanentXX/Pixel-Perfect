import { CircularProgress, Link } from "@nextui-org/react";
import DownloadButton from "../../../ui/DownloadButton";
import { Status } from "@/store/models/types";

interface GenerateResultsViewProps {
  generateStatus: Status;
  progressText: { value: number; text: string };
  imageList: { imageUrl: string }[];
  openModal: (imageUrl: string) => void;
}
const GenerateResultsView = ({ generateStatus, progressText, imageList, openModal }:GenerateResultsViewProps) => {
  function renderContentByState(status:Status) {
    switch (status) {
      case "idle":
        return <p>Your creation will show up here.</p>;
      case "loading":
        return (
          <div className="flex flex-col items-center justify-center gap-2">
            <CircularProgress
              aria-label="Loading..."
              size="lg"
              value={progressText.value * 100}
              color="primary"
              className="dark"
              showValueLabel={true}
              classNames={{
                svg: "w-20 h-20 drop-shadow-md",
                track: "stroke-white/20",
                value: "text-white text-md",
              }}
            />
            <p>{progressText.text}</p>
          </div>
        );
      case "succeeded":
        return (
          <div className=" grid h-full grid-cols-2 gap-4 p-4">
            {imageList.map((image, index) => (
              <div key={index} className={`group relative flex overflow-hidden rounded-2xl ${index % 2 === 0 ? "justify-end" : "justify-start"}`}>
                <img src={image.imageUrl} alt={"generate result"} className="transition-scale h-full w-full object-cover duration-300 ease-in-out hover:scale-110" onClick={() => openModal(image.imageUrl)} />
                <DownloadButton imageUrl={image.imageUrl} />
              </div>
            ))}
          </div>
        );
      case "failed":
        return (
          <div className="flex flex-col items-center gap-2">
            <p>
              ‍💻 Our demo is at capacity right now. <br />
              Please contact us at the following email:
            </p>
            <Link size="lg" isBlock showAnchorIcon href="mailto:customer@pixelperfect.ai" color="foreground">
              customer@pixelperfect.ai
            </Link>
          </div>
        );
      default:
        return <p>Unknown state.</p>;
    }
  }

  return <div className="flex h-full w-full items-center justify-center text-center">{renderContentByState(generateStatus)}</div>;
};

export default GenerateResultsView;
