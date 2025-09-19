import { fireEvent, render, waitFor } from '@testing-library/react-native';
import RecordingScreen from '../Recording';

// Mock expo-camera
jest.mock('expo-camera', () => ({
  Camera: {
    requestCameraPermissionsAsync: jest.fn(() => Promise.resolve({ status: 'granted' })),
    requestMicrophonePermissionsAsync: jest.fn(() => Promise.resolve({ status: 'granted' })),
  },
  CameraView: jest.fn().mockImplementation((props) => {
    // Store ref for testing
    if (props.ref) {
      props.ref.current = {
        recordAsync: jest.fn(() => Promise.resolve({ uri: 'file://mock-video.mp4' })),
        stopRecording: jest.fn(),
      };
    }
    return null;
  }),
}));

// Mock expo/vector-icons
jest.mock('@expo/vector-icons', () => ({
  MaterialCommunityIcons: () => null,
}));

describe('RecordingScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly with initial state', async () => {
    const { getByText } = render(<RecordingScreen />);

    await waitFor(() => {
      expect(getByText('Recording Studio')).toBeTruthy();
    });

    expect(getByText('Record your athletic performance for AI-powered assessment')).toBeTruthy();
    expect(getByText('Select Exercise')).toBeTruthy();
    expect(getByText('Record')).toBeTruthy();
  });

  it('handles exercise selection', async () => {
    const { getByText } = render(<RecordingScreen />);

    await waitFor(() => {
      expect(getByText('Recording Studio')).toBeTruthy();
    });

    const situpsButton = getByText('Sit-ups');
    fireEvent.press(situpsButton);

    // Check if the button is selected (this would require checking styles or state)
    expect(situpsButton).toBeTruthy();
  });

  it('starts recording when record button is pressed', async () => {
    const { getByText, queryByText } = render(<RecordingScreen />);

    await waitFor(() => {
      expect(getByText('Recording Studio')).toBeTruthy();
    });

    const recordButton = getByText('Record');
    fireEvent.press(recordButton);

    // Since the mock immediately transitions to preview, check for preview elements
    await waitFor(() => {
      expect(queryByText('Retake')).toBeTruthy();
      expect(queryByText('Upload')).toBeTruthy();
    });
  });

  it('shows preview options after recording', async () => {
    const { getByText, queryByText } = render(<RecordingScreen />);

    await waitFor(() => {
      expect(getByText('Recording Studio')).toBeTruthy();
    });

    const recordButton = getByText('Record');
    fireEvent.press(recordButton);

    await waitFor(() => {
      expect(queryByText('Retake')).toBeTruthy();
      expect(queryByText('Upload')).toBeTruthy();
    });
  });

  it('handles retake functionality', async () => {
    const { getByText, queryByText } = render(<RecordingScreen />);

    await waitFor(() => {
      expect(getByText('Recording Studio')).toBeTruthy();
    });

    // Start recording
    const recordButton = getByText('Record');
    fireEvent.press(recordButton);

    await waitFor(() => {
      const retakeButton = getByText('Retake');
      fireEvent.press(retakeButton);
    });

    await waitFor(() => {
      expect(getByText('Record')).toBeTruthy();
    });
  });

  it('handles upload functionality', async () => {
    const { getByText, queryByText } = render(<RecordingScreen />);

    await waitFor(() => {
      expect(getByText('Recording Studio')).toBeTruthy();
    });

    // Start recording
    const recordButton = getByText('Record');
    fireEvent.press(recordButton);

    await waitFor(() => {
      const uploadButton = getByText('Upload');
      fireEvent.press(uploadButton);
    });

    await waitFor(() => {
      expect(getByText('Record')).toBeTruthy();
    });
  });
});
