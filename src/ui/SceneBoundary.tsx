import { Component, type ReactNode } from 'react'

/**
 * If WebGL is unavailable, drop the 3D scene and keep the rest of the site working:
 * the header nav still opens every section over the plain starry background.
 */
export class SceneBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false }

  static getDerivedStateFromError() {
    return { failed: true }
  }

  componentDidCatch(error: unknown) {
    console.warn('3D scene unavailable; showing the static layout instead.', error)
  }

  render() {
    return this.state.failed ? null : this.props.children
  }
}
