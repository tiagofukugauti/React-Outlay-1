export default function Error({ children: errorMessage }) {
  return (
    <div className="text-center mt-2">
      <span className="bg-red-300 text-red-900 font-semibold p-2">
        {errorMessage}
      </span>
    </div>
  );
}
