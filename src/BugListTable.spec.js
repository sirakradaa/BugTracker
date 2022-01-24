import { render, fireEvent, screen } from "@testing-library/react";

test('the bug table should display a list of bugs'), () => {
    const bugList: IBug[] = [
        { id: '1234', description: 'A test bug' , priority: BugPriority.LOW},
        { id: '2345', description: 'Another test bug' , priority: BugPriority.MEDIUM},
        { id: '3456', description: 'Last test bug' , priority: BugPriority.HIGH}
    ]

    render(<BugListTable bugs={bugList} onDeleteBug={() => {}}/>)
    const rows = screen.getAllByRole('row');

});