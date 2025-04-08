'use client'

import React, { useState } from 'react'
import { Comment } from '@/Interfaces/Interfaces'
import { useRef } from 'react'
import { useMutation } from '@tanstack/react-query'

interface CommentBlockProps {
  characterBuildId: string
  commenterId: string
  comments: Comment[]
}

const CommentBlock: React.FC<CommentBlockProps> = ({
  characterBuildId,
  commenterId,
  comments,
}) => {
  const [commentData, setCommentData] = useState(comments)
  const commentRef = useRef<HTMLTextAreaElement | null>(null)

  const commentMutation = useMutation({
    mutationFn: async (comment: string) => {
      const response = await fetch('/api/comments/post', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          comment,
          commenterId: Number(commenterId),
          characterBuildId: Number(characterBuildId),
        }),
      })
      if (!response.ok) throw new Error('Failed to post comment')
      return response.json()
    },
    onSuccess: (data) => {
      console.log('Comment posted successfully:', data)
      commentRef.current!.value = ''

      setCommentData([...commentData, data.comment])
    },
    onError: (error) => {
      console.error(error)
    },
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    commentMutation.mutate(commentRef.current?.value || '')
  }

  return (
    <>
      {commentMutation.isPending && <p>Loading...</p>}
      {commentData.map((comment: Comment) => (
        <div key={comment.id} className="flex flex-col gap-2">
          <p>{comment.commenter.name}</p>
          <p>{comment.comment}</p>
        </div>
      ))}
      <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
        <textarea
          id="comment"
          placeholder="Comment"
          name="comment"
          ref={commentRef}
        />
        <button type="submit">Submit</button>
      </form>
    </>
  )
}

export default CommentBlock
