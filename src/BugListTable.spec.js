import { render, fireEvent, screen } from "@testing-library/react";
import { BugPriority, IBug } from './IBug';
import BugListTable from './BugListTable';


test('the bug table should display a list of bugs', () => {
    const bugList: IBug[] = [
        { id: '1234', description: 'A test bug' , priority: BugPriority.LOW},
        { id: '2345', description: 'Another test bug' , priority: BugPriority.MEDIUM},
        { id: '3456', description: 'Last test bug' , priority: BugPriority.HIGH}
    ];

    render(<BugListTable bugs={bugList} onDeleteBug={() => {}}/>)
    const rows = screen.getAllByRole('row');
    for (let index = 1; index < rows.length; index +=1) {
        expect(rows[index]).toHaveTextContent(bugList[index - 1].description);
    }
});


test('the resolved button should remove the bug', () => {
    let bugList: IBug[] = [
        { id: '1234', description: 'A test bug' , priority: BugPriority.LOW},
        { id: '2345', description: 'Another test bug' , priority: BugPriority.MEDIUM},
        { id: '3456', description: 'Last test bug' , priority: BugPriority.HIGH}
    ]

    const removeBug = (id: string) => {
        bugList = bugList.filter(bug => bug.id !== id);
    }

    const {rerender} = render(<BugListTable bugs={bugList} onDeleteBug={(id: string) => { removeBug(id) }} />)
    
    fireEvent.click(screen.getAllByText('Resolved')[0])
    rerender(<BugListTable bugs={bugList} onDeleteBug={(id: string) => { removeBug(id) }} />)
    const rows = screen.getAllByRole('row');
    expect(rows.length).toBe(3);
});