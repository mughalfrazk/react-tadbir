import { Skeleton as MuiSkeleton, SkeletonProps } from '@mui/material'

const Skeleton = ({ animation = 'wave', ...otherProps }: SkeletonProps) => {
  return <MuiSkeleton animation={animation} {...otherProps} />
}

export default Skeleton
