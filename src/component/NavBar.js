import React from "react";

export function NavBar() {
    const navigate = useNavigate();
    return (
        <Flex>
            <Button onClick={() => nviagte("/")}>home</Button>
            <Button onClick={() => navigator("/write")}>wrute</Button>
        </Flex>
    )
}