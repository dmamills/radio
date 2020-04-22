import React from 'react';
import stylish from '@dmamills/stylish';
import { fireEvent, render } from '@testing-library/react';
import File from './File';

const testFile = {
  file: "blah.mp3"
};

describe('File Component', () => {
  it('renders without crashing', () => {
    const { getByText } = render(<File file={testFile} />);
    expect(getByText('blah.mp3')).toBeInTheDocument();
  });


  it('should call selectFile when clicked', () => {
    const spyFn = jest.fn();
    const { queryByTestId } = render(<File file={testFile} selectFile={spyFn} folder='/' />);

    fireEvent.click(queryByTestId('file-select'));
    expect(spyFn).toHaveBeenCalled();
    expect(spyFn).toHaveBeenCalledWith(testFile);
  });

  it('should call selectFile with folder name if provided', () => {
    const spyFn = jest.fn();
    const { queryByTestId } = render(<File file={{ file: '/some/path/blah.mp3'}} selectFile={spyFn} folder='/some/path' />);

    fireEvent.click(queryByTestId('file-select'));
    expect(spyFn).toHaveBeenCalled();
    expect(spyFn).toHaveBeenCalledWith({ file: '/some/path/blah.mp3' });
  });

  it('should change styles if song is currently selected', () => {
    const { rerender, queryByTestId } = render(<File file={testFile} folder='/' selectedFile={testFile} />);

    const bgClassName = stylish({ backgroundColor: '#bac6d3' });
    expect(queryByTestId('file-select')).toHaveClass(bgClassName);


    rerender(<File file="blah.mp3" folder={testFile} selectedFile={{ file: 'notblah.mp3' }} />);
    expect(queryByTestId('file-select')).not.toHaveClass(bgClassName);
  });
});
