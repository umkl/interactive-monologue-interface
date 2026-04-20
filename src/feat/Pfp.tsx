export default function Pfp() {
  return (
    <div className="chat-frame">
      <img
        {...{
          className: "pfp",
        }}
        src="/pfp.jpg"
        alt="Profile Picture"
      />
    </div>
  );
}
