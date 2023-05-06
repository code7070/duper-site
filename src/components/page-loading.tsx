import Loading from "./loading";

export default function PageLoading() {
  return (
    <div className="h-screen w-screen fixed left-0 top-0 flex justify-center items-center">
      <Loading />
    </div>
  );
}
