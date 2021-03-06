import Button from "@components/Button";

export default {
	title: "components/button",
	component: Button,
};

export const Default = () => {
	return (
		<>
			<Button backgroundColor="#057DCD">확인</Button>
			<Button
				style={{ border: "1px solid gray", marginLeft: "5px" }}
				color="gray"
				onClick={() => console.log("clicked!")}>
				취소
			</Button>
		</>
	);
};
